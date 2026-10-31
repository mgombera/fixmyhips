import trimesh, numpy as np, sys
W='/home/claude/hipmesh/work/'
s=trimesh.Scene()
for n in ['pelvis','femur']:
    m=trimesh.load(W+f'{n}_final.ply'); m.visual=trimesh.visual.ColorVisuals(m)
    _=m.vertex_normals
    s.add_geometry(m,node_name=n,geom_name=n)
s.export(sys.argv[1], include_normals=True)
