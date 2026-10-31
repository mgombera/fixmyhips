import trimesh,sys
s=trimesh.Scene()
for f in sys.argv[2:]:
    m=trimesh.load(f); s.add_geometry(m,node_name=f.split('/')[-1].split('.')[0],geom_name=f.split('/')[-1].split('.')[0])
s.export(sys.argv[1])
