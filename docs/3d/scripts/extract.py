import trimesh, numpy as np, sys
src=sys.argv[1]; out=sys.argv[2]
s=trimesh.load(src, force='scene')
want=['VH_M_femur_R','VH_M_ilium_compact_bone_R','VH_M_ischium_compact_bone_R','VH_M_pubis_compact_bone_R','VH_M_femur_L','VH_M_ilium_compact_bone_L']
for node in s.graph.nodes_geometry:
    T,gname=s.graph[node]
    if gname in want or node in want:
        m=s.geometry[gname].copy(); m.apply_transform(T)
        print(node,gname,len(m.faces),m.bounds.round(4).tolist(), 'wt',m.is_watertight)
        m.export(f'{out}/{gname}.ply')
