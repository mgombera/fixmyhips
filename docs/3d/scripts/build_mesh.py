import trimesh, numpy as np, manifold3d as mf, fast_simplification as fs, sys
W='/home/claude/hipmesh/work/'
SINC={'pelvis':80,'femur':10}
YCUT=float(sys.argv[1]); TP=int(sys.argv[2]); TF=int(sys.argv[3])
def to_manifold(m):
    return mf.Manifold(mf.Mesh(vert_properties=np.asarray(m.vertices,np.float32), tri_verts=np.asarray(m.faces,np.uint32)))
def from_manifold(M):
    o=M.to_mesh(); return trimesh.Trimesh(o.vert_properties[:,:3].astype(np.float64), o.tri_verts, process=True)
parts=[trimesh.load(W+f'VH_M_{n}_compact_bone_R.ply') for n in ['ilium','ischium','pubis']]
U=to_manifold(parts[0])
for p in parts[1:]: U=U+to_manifold(p)
bodies=from_manifold(U).split(only_watertight=False)
pelvis=max(bodies,key=lambda b:b.volume)   # outer surface only (drop internal medullary void)
# The VH compact-bone parts are open shells (outer + inner cortex walls joined at their ends), so the union keeps small
# lips/creases at the ilium/ischium/pubis junctions. Rebuild a clean solid: voxelize the outer envelope (0.4 mm), fill,
# blur slightly, marching cubes.
import scipy.ndimage as ndi
from skimage import measure
PITCH=0.0004
vg=pelvis.voxelized(PITCH); occ=ndi.binary_fill_holes(vg.matrix)
occ=np.pad(occ,3); f=ndi.gaussian_filter(occ.astype(np.float32),1.2)
vv,ff,_,_=measure.marching_cubes(f,0.5)
vv=(vv-3)*PITCH; vv=trimesh.transform_points(vv,vg.transform) if False else vv
origin=vg.transform[:3,3]; vv=vv+origin
pelvis=trimesh.Trimesh(vv,ff[:,::-1],process=True); pelvis=max(pelvis.split(only_watertight=False),key=lambda b:b.area)
if pelvis.volume<0: pelvis.invert()
src_outer=max(bodies,key=lambda b:b.volume)
sd=trimesh.proximity.signed_distance(src_outer,pelvis.vertices[::50])  # trimesh: positive inside
off=float(np.median(sd)); print('voxel surface offset vs source (mm, +inside):',off*1e3)
pelvis.vertices=pelvis.vertices+pelvis.vertex_normals*off
print('pelvis voxel remesh',len(pelvis.faces),pelvis.is_watertight,round(pelvis.volume*1e6,1))
fem=trimesh.load(W+'VH_M_femur_R.ply'); fem.merge_vertices()
fem=fem.slice_plane([0,YCUT,0],[0,1,0],cap=True); fem.merge_vertices()
import pyvista as pv
def tm2pv(m): return pv.PolyData(m.vertices, np.c_[np.full(len(m.faces),3),m.faces].ravel())
def pv2tm(p): p=p.triangulate(); return trimesh.Trimesh(p.points.astype(np.float64), p.faces.reshape(-1,4)[:,1:], process=True)
def refine(m,target,name):
    it=0
    while len(m.faces)*4**it < 1.5*target: it+=1
    if it:
        v,f=trimesh.remesh.subdivide_loop(m.vertices,m.faces,iterations=it); m=trimesh.Trimesh(v,f,process=True)
    p=tm2pv(m).clean()
    p=p.smooth_taubin(n_iter=SINC.get(name,10),pass_band=(0.01 if name=='pelvis' else 0.05),non_manifold_smoothing=True)
    p=p.decimate(1-target/p.n_cells,volume_preservation=True)
    p=p.smooth_taubin(n_iter=10,pass_band=0.1)
    m=pv2tm(p)
    m.update_faces(m.nondegenerate_faces()); m.update_faces(m.unique_faces()); m.remove_unreferenced_vertices(); m.fix_normals()
    print(name,'subdiv',it,len(m.faces),'tris',len(m.vertices),'verts watertight',m.is_watertight,'vol cm3',round(m.volume*1e6,1))
    return m
import scipy.sparse as sp
def fix_creases(m,name,thr=35,rings=2,iters=8,rounds=6):
    # local umbrella smoothing restricted to vertices near sharp/folded edges (union seams, decimation folds)
    for k in range(rounds):
        a=np.degrees(m.face_adjacency_angles); bad=m.face_adjacency_edges[a>thr].ravel()
        if len(bad)==0: break
        sel=np.zeros(len(m.vertices),bool); sel[bad]=True
        E=m.edges_unique; A=sp.coo_matrix((np.ones(len(E)*2),(np.r_[E[:,0],E[:,1]],np.r_[E[:,1],E[:,0]])),shape=(len(m.vertices),)*2).tocsr()
        for _ in range(rings): sel|=(A@sel.astype(float))>0
        deg=np.asarray(A.sum(1)).ravel()
        v=m.vertices.copy()
        for _ in range(iters):
            avg=(A@v)/deg[:,None]; v[sel]=0.5*v[sel]+0.5*avg[sel]
        m.vertices=v
    a=np.degrees(m.face_adjacency_angles); print(name,'sharp edges >%d after fix:'%thr,(a>thr).sum(),' >70:',(a>70).sum())
    return m
pelvis=refine(pelvis,TP,'pelvis'); fem=refine(fem,TF,'femur')
pelvis=fix_creases(pelvis,'pelvis'); fem=fix_creases(fem,'femur')
pelvis.export(W+'pelvis_ref.ply'); fem.export(W+'femur_ref.ply')
