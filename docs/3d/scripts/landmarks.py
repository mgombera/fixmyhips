import trimesh, numpy as np, json
W='/home/claude/hipmesh/work/'; O='/home/claude/hipmesh/out/'
P=trimesh.load(W+'pelvis_ref.ply'); F=trimesh.load(W+'femur_ref.ply')
X=np.array([1.,0,0]); Y=np.array([0,1.,0]); Z=np.array([0,0,1.])
LAT=-X; MED=X  # right side: patient's right is -X in this right-handed Y-up, Z-anterior frame
def unit(v): return v/np.linalg.norm(v)
def sphere_fit(p):
    A=np.c_[2*p,np.ones(len(p))]; b=(p**2).sum(1); s=np.linalg.lstsq(A,b,rcond=None)[0]
    c=s[:3]; return c,np.sqrt(s[3]+c@c)
def robust_sphere(pts,c,r,tol,iters=15,maxdist=None):
    for _ in range(iters):
        d=np.linalg.norm(pts-c,axis=1); sel=np.abs(d-r)<tol
        if maxdist is not None: sel&=maxdist(pts,c,r)
        c,r=sphere_fit(pts[sel])
    return c,r,sel
# ---- femoral head: seed = femur vertex closest to the pelvis region (medial-most proximal), iterative sphere fit
fv=F.vertices; fn=F.vertex_normals
seed_pts=fv[(fv[:,1]>fv[:,1].max()-0.06)]
med=seed_pts[np.argsort(seed_pts@MED)[-200:]]
c0=med.mean(0)+LAT*0.02; r0=0.024
# only use points on the medial (head) side of the neck: angle from head axis < 75 deg
for k in range(10):
    hax=unit(med.mean(0)-c0) if k==0 else hax
    d=np.linalg.norm(fv-c0,axis=1); cosang=((fv-c0)@hax)/np.maximum(d,1e-9)
    sel=(np.abs(d-r0)<0.0025)&(cosang>np.cos(np.radians(70)))
    c0,r0=sphere_fit(fv[sel])
    hax=unit(fv[sel].mean(0)-c0)
HC,HR=c0,r0; head_sel=sel
res=np.abs(np.linalg.norm(fv[sel]-HC,axis=1)-HR)
print('head',HC,HR,'n',sel.sum(),'rms resid mm',np.sqrt((res**2).mean())*1e3)
# ---- shift everything so head center is origin
P.apply_translation(-HC); F.apply_translation(-HC); shift=-HC.copy(); HC=np.zeros(3)
pv=P.vertices; pn=P.vertex_normals; fv=F.vertices; fn=F.vertex_normals
# ---- acetabulum (lunate surface): pelvis verts within head radius+8mm whose normals face the head center
# articular (lunate) surface = pelvis verts in a thin shell around the head (< head radius + 3.4 mm) whose normals face the head center;
# a wider shell pulls in the non-articular acetabular fossa and the rim and biases the fit
d=np.linalg.norm(pv,axis=1); facing=((-pv/d[:,None])*pn).sum(1)
sel=(d<HR+0.0034)&(facing>0.9)
ac,ar=sphere_fit(pv[sel])
d2=np.linalg.norm(pv-ac,axis=1); sel&=np.abs(d2-ar)<0.0015
ac,ar=sphere_fit(pv[sel])
lunate=pv[sel]
res=np.abs(np.linalg.norm(lunate-ac,axis=1)-ar)
print('acetab',ac,ar,'n',sel.sum(),'rms mm',np.sqrt((res**2).mean())*1e3)
# opening axis: opposite to mean direction of lunate points from the center
a_lunate=a=unit(-(unit_rows:=(lunate-ac)/np.linalg.norm(lunate-ac,axis=1)[:,None]).mean(0))
# ---- rim: in spherical coords about ac with pole -a (socket depth), per azimuth bin take max polar angle among socket-side verts
def rim_from_axis(a):
    deep=-a; e1=unit(np.cross(deep,Y)); e2=np.cross(deep,e1)
    rel=pv-ac; dist=np.linalg.norm(rel,axis=1); u=rel/dist[:,None]
    pol=np.degrees(np.arccos(np.clip(u@deep,-1,1))); az=np.degrees(np.arctan2(u@e2,u@e1))%360
    cand=(dist<ar+0.007)&(dist>ar-0.004)&(((ac-pv)/dist[:,None]*pn).sum(1)>0.0)
    NB=48; rim=[]
    for i in range(NB):
        lo=i*360/NB; idx=np.where(cand&(az>=lo)&(az<lo+360/NB))[0]
        rim.append(pv[idx[np.argmax(pol[idx])]])
    rim=np.array(rim)
    rs=(np.roll(rim,1,0)+2*rim+np.roll(rim,-1,0))/4
    rim=P.nearest.on_surface(rs)[0]
    cen=rim.mean(0); rn=np.linalg.svd(rim-cen)[2][2]
    if rn@a<0: rn=-rn
    return rim,cen,rn
ax=a
for _ in range(4):
    rim,cen,rn=rim_from_axis(ax); ax=rn
a=rn
# ---- femoral neck axis: iterate centroid of narrowest cross-section
nax=unit(-(fv[head_sel].mean(0)))  # from head center away from head cap
best=None
for it in range(5):
    areas=[]
    for t in np.arange(HR*0.6,HR*1.9,0.001):
        s=F.section(plane_origin=nax*t,plane_normal=nax)
        if s is None: continue
        s2,T=s.to_2D(); 
        polys=s2.polygons_full
        if not polys: continue
        pg=max(polys,key=lambda q:q.area)
        c2=np.array(pg.centroid.coords[0]); c3=(T@np.r_[c2,0,1])[:3]
        areas.append((pg.area,t,c3))
    amin=min(areas,key=lambda q:q[0]); nax=unit(amin[2]); best=amin
neck_min_area=best[0]; neck_waist=best[2]
# ---- head-neck junction (anterosuperior): wedge around u=(ant+sup) perpendicular to neck axis, first sphericity departure
u_as=unit((Z+Y)-((Z+Y)@nax)*nax)
t=fv@nax; perp=fv-np.outer(t,nax); pr=np.linalg.norm(perp,axis=1)
ang=np.degrees(np.arccos(np.clip((perp/np.maximum(pr,1e-9)[:,None])@u_as,-1,1)))
w=np.where((ang<12)&(t>-HR))[0]; w=w[np.argsort(t[w])]
dd=np.linalg.norm(fv[w],axis=1)
dev=np.where((np.abs(dd-HR)>0.0015)&(t[w]>0))[0]
hnj=fv[w[dev[0]-1]] if dev[0]>0 else fv[w[dev[0]]]
# ---- greater trochanter tip: most superior femur point lateral to the neck
latmask=(fv@LAT)>0.03
gt=fv[latmask][np.argmax(fv[latmask][:,1])]
# ---- shaft axis from slice centroids in the upper shaft
ys=np.linspace(fv[:,1].min()+0.02,-0.08,8); cs=[]
for yy in ys:
    s=F.section(plane_origin=[0,yy,0],plane_normal=Y)
    s2,T=s.to_2D(); pg=max(s2.polygons_full,key=lambda q:q.area); c2=np.array(pg.centroid.coords[0]); cs.append((T@np.r_[c2,0,1])[:3])
cs=np.array(cs); cm=cs.mean(0); sax=np.linalg.svd(cs-cm)[2][0]; sax=sax if sax[1]>0 else -sax
# ---- lesser trochanter: max posteromedial prominence relative to shaft axis, below the neck
pm=unit(MED-Z); 
rel=fv-cm; radial=rel-np.outer(rel@sax,sax)
m=(fv[:,1]<-0.035)&(fv[:,1]>-0.10)
lt=fv[m][np.argmax(radial[m]@pm)]
# ---- ASIS: most anterior pelvis point above the acetabulum and lateral half of ilium
m=(pv[:,1]>ac[1]+0.03)
asis=pv[m][np.argmax(pv[m][:,2])]
crest=pv[np.argmax(pv[:,1])]
# ---- gluteus medius origin: centroid of outward (lateral) facing outer ilium between acetabular roof and crest, snapped
m=(pn@LAT>0.6)&(pv[:,1]>ac[1]+0.045)&(pv[:,1]<crest[1]-0.015)
gmo=P.nearest.on_surface([pv[m].mean(0)])[0][0]
# snap to a lateral-facing vertex nearest that centroid
idx=np.where(m)[0]; gmo=pv[idx[np.argmin(np.linalg.norm(pv[idx]-gmo,axis=1))]]
# ---- gluteus medius insertion: lateral facet of GT: lateral-facing verts 8-25mm below GT tip, centroid snapped
m=(fn@LAT>0.6)&(fv[:,1]<gt[1]-0.008)&(fv[:,1]>gt[1]-0.025)&((fv@LAT)>0.04)
idx=np.where(m)[0]; c=fv[idx].mean(0); gmi=fv[idx[np.argmin(np.linalg.norm(fv[idx]-c,axis=1))]]
r=lambda v:[round(float(x),5) for x in v]
L={
 "units":"meters",
 "frame":"glTF right-handed, +Y superior, +Z anterior, +X = patient's LEFT (so lateral for this right hip is -X). Origin = femoral head center.",
 "source_translation_applied":r(shift),
 "femoral_head":{"center":r(HC),"radius":round(float(HR),5),"fit_vertices":int(head_sel.sum())},
 "acetabulum":{"center":r(ac),"radius":round(float(ar),5),"fit_vertices":int(len(lunate)),"opening_axis_lunate_mean":r(a_lunate)},
 "acetabular_rim":{"points":[r(p) for p in rim],"plane_normal":r(rn),"plane_centroid":r(cen),"order":"ccw azimuth about socket axis starting at axis x deep-superior reference"},
 "femoral_neck_axis":r(nax),
 "femoral_neck_waist_center":r(neck_waist),
 "femoral_shaft_axis":r(sax),
 "head_neck_junction_anterosuperior":r(hnj),
 "greater_trochanter_tip":r(gt),
 "lesser_trochanter":r(lt),
 "anterior_superior_iliac_spine":r(asis),
 "iliac_crest_top":r(crest),
 "gluteus_medius_origin":r(gmo),
 "gluteus_medius_insertion":r(gmi),
}
import math
L["derived_metrics"]={
 "neck_shaft_angle_deg":round(math.degrees(math.acos(float(np.clip(nax@sax,-1,1)))),1),
 "head_to_acetab_center_mm":round(float(np.linalg.norm(ac))*1e3,2),
 "rim_plane_inclination_deg_from_horizontal":round(math.degrees(math.acos(abs(float(rn@Y)))),1),
}
json.dump(L,open(O+'landmarks.json','w'),indent=1)
P.export(W+'pelvis_final.ply'); F.export(W+'femur_final.ply')
print(json.dumps({k:v for k,v in L.items() if k!='acetabular_rim'},indent=0))
