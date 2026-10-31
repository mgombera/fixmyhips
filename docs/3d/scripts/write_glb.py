# minimal GLB writer: one node + mesh per bone, POSITION/NORMAL float32, uint16 indices, no materials
import trimesh, numpy as np, json, struct, sys
W='/home/claude/hipmesh/work/'
bufs=[]; views=[]; accs=[]; meshes=[]; nodes=[]; off=0
def add(arr,target,ctype,typ,minmax=False):
    global off
    b=arr.tobytes(); pad=(-len(b))%4
    views.append({"buffer":0,"byteOffset":off,"byteLength":len(b),"target":target}); bufs.append(b+b'\0'*pad); off+=len(b)+pad
    a={"bufferView":len(views)-1,"componentType":ctype,"count":int(arr.shape[0] if arr.ndim>1 else arr.size),"type":typ}
    if minmax: a["min"]=arr.min(0).tolist(); a["max"]=arr.max(0).tolist()
    accs.append(a); return len(accs)-1
for n in ['pelvis','femur']:
    m=trimesh.load(W+f'{n}_final.ply')
    assert len(m.vertices)<65535
    pos=m.vertices.astype(np.float32); nor=m.vertex_normals.astype(np.float32); idx=m.faces.astype(np.uint16).ravel()
    ip=add(pos,34962,5126,"VEC3",True); inn=add(nor,34962,5126,"VEC3"); ii=add(idx,34963,5123,"SCALAR")
    meshes.append({"name":n,"primitives":[{"attributes":{"POSITION":ip,"NORMAL":inn},"indices":ii,"mode":4}]})
    nodes.append({"name":n,"mesh":len(meshes)-1})
    print(n,len(m.faces),'tris',len(m.vertices),'verts')
bin_=b''.join(bufs)
g={"asset":{"version":"2.0","generator":"hipmesh build (trimesh + custom writer)",
   "copyright":"Derived from HuBMAP/HRA CCF 3D Reference Object Library, Visible Human Male (VH_M) femur and hip bone, CC BY 4.0"},
   "scene":0,"scenes":[{"name":"hip","nodes":[0,1]}],"nodes":nodes,"meshes":meshes,"accessors":accs,"bufferViews":views,"buffers":[{"byteLength":len(bin_)}]}
js=json.dumps(g,separators=(',',':')).encode(); js+=b' '*((-len(js))%4)
out=struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(bin_))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(bin_),0x004E4942)+bin_
open(sys.argv[1],'wb').write(out); print('bytes',len(out))
