"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import L from "./landmarks.json";
import type { PartId, ViewId, Stage } from "./parts";

// Right hip built on CT-derived bone meshes (HuBMAP HRA, Visible Human Male,
// CC BY 4.0). Soft tissues are generated from measured landmarks.
// Frame (meters): +Y superior, +Z anterior, lateral of this right hip is -X,
// origin at the femoral head center. The scene is scaled up by S.

const S = 40;
const MODEL_URL = "/models/hip.glb";

const BONE = "#e8e0cf";
const CARTILAGE = "#9fc6e6";
const LABRUM = "#3aa7f0";
const GRAFT = "#5fcf98";
const TEAR = "#ff4d4d";
const BUMP = "#ff9b57";
const MUSCLE = "#b8574f";
const ANCHOR = "#ffffff";
const CAPSULE = "#cdb8f2";

const v = (a: number[]) => new THREE.Vector3(a[0], a[1], a[2]);
const RIM = L.acetabular_rim.points.map(v);
const RIM_N = v(L.acetabular_rim.plane_normal).normalize();
const RIM_C = v(L.acetabular_rim.plane_centroid);
const ACET_C = v(L.acetabulum.center);
const NECK = v(L.femoral_neck_axis).normalize();

// Rim indices: 0 = anterior (3 o'clock), clockwise from outside: anteroinferior,
// inferior notch (about 10 to 16, no labrum there), posterior, superior.
const TEAR_IDX = [40, 41, 42, 43, 44, 45, 46, 47, 0]; // anterosuperior, where most tears occur
const ANCHOR_IDX = [41, 44, 47];

/** Rim point pushed slightly outward (away from the socket centre) and along the opening. */
function rimAt(i: number, out = 0.0012, lift = 0.0008) {
  const p = RIM[(i + RIM.length) % RIM.length].clone();
  const radial = p.clone().sub(RIM_C).projectOnPlane(RIM_N).normalize();
  return p.add(radial.multiplyScalar(out)).add(RIM_N.clone().multiplyScalar(lift));
}

function tube(indices: number[], radius: number, out?: number, lift?: number, closed = false) {
  const curve = new THREE.CatmullRomCurve3(indices.map((i) => rimAt(i, out, lift)), closed, "centripetal");
  return new THREE.TubeGeometry(curve, indices.length * 6, radius, 12, closed);
}

/** Indices from a to b inclusive, going forward around the rim. */
function span(a: number, b: number) {
  const out: number[] = [];
  for (let i = a; ; i = (i + 1) % RIM.length) {
    out.push(i);
    if (i === b) break;
  }
  return out;
}

type PartProps = {
  id: PartId;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  color: string;
  opacity?: number;
  side?: THREE.Side;
  geometry?: THREE.BufferGeometry;
  position?: THREE.Vector3 | [number, number, number];
  quaternion?: THREE.Quaternion;
  scale?: THREE.Vector3 | [number, number, number];
  children?: React.ReactNode;
  roughness?: number;
};

function Part({ id, selected, onSelect, color, opacity = 1, side, geometry, position, quaternion, scale, children, roughness = 0.62 }: PartProps) {
  const active = selected === id;
  const [hover, setHover] = useState(false);
  return (
    <mesh
      geometry={geometry}
      position={position}
      quaternion={quaternion}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "";
      }}
    >
      {children}
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.02}
        transparent={opacity < 1}
        opacity={opacity}
        depthWrite={opacity >= 1}
        side={side ?? THREE.FrontSide}
        emissive={color}
        emissiveIntensity={active ? 0.38 : hover ? 0.18 : 0}
      />
    </mesh>
  );
}

function Bone({ node, ...rest }: Omit<PartProps, "color" | "geometry"> & { node: THREE.Mesh }) {
  return (
    <Part {...rest} color={BONE} geometry={node.geometry} position={node.position} quaternion={node.quaternion} scale={node.scale} roughness={0.75} />
  );
}

function Capsule(props: Omit<PartProps, "color">) {
  // Loft from a ring just outside the acetabular rim to a ring around the base of the neck.
  const geometry = useMemo(() => {
    const seg = 48;
    const neckBase = NECK.clone().multiplyScalar(0.034);
    const pos: number[] = [];
    const rows = 8;
    for (let r = 0; r <= rows; r++) {
      const t = r / rows;
      for (let i = 0; i <= seg; i++) {
        const k = Math.round((i / seg) * RIM.length) % RIM.length;
        const a = rimAt(k, 0.004, -0.001);
        // Match the ring's angular position to the rim point's direction around the neck.
        const dir = a.clone().sub(neckBase).projectOnPlane(NECK).normalize();
        const b = neckBase.clone().add(dir.multiplyScalar(0.0175));
        const bulge = Math.sin(t * Math.PI) * 0.004;
        const p = a.clone().lerp(b, t);
        const outward = p.clone().projectOnPlane(NECK).normalize().multiplyScalar(bulge);
        pos.push(p.x + outward.x, p.y + outward.y, p.z + outward.z);
      }
    }
    const idx: number[] = [];
    for (let r = 0; r < rows; r++)
      for (let i = 0; i < seg; i++) {
        const a = r * (seg + 1) + i;
        const b = a + seg + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, []);
  return <Part {...props} color={CAPSULE} geometry={geometry} opacity={0.22} side={THREE.DoubleSide} />;
}

function Scene({
  selected,
  onSelect,
  stage,
  showGlute,
  graft,
  hideFemur,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  stage: Stage;
  showGlute: boolean;
  graft: boolean;
  hideFemur: boolean;
}) {
  const { nodes } = useGLTF(MODEL_URL, false, true) as unknown as { nodes: Record<string, THREE.Mesh> };
  const p = { selected, onSelect };

  const geo = useMemo(() => {
    const allLabrum = [...span(17, 9)]; // horseshoe: everything except the inferior notch
    const intact = allLabrum.filter((i) => !TEAR_IDX.includes(i));
    return {
      labrumFull: tube(allLabrum, 0.0021),
      labrumIntact: tube(intact, 0.0021),
      labrumTear: tube(TEAR_IDX, 0.0019, 0.0006, 0.0028),
      pincer: tube(span(38, 2), 0.0024, 0.0038, -0.0004),
      cartilage: (() => {
        // Spherical cap lining the socket, opening along the rim normal.
        const r = L.acetabulum.radius - 0.0013;
        const g = new THREE.SphereGeometry(r, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.44);
        g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), RIM_N.clone().negate()));
        g.translate(ACET_C.x, ACET_C.y, ACET_C.z);
        return g;
      })(),
    };
  }, []);

  // Cam bump at the anterosuperior head-neck junction.
  const cam = v(L.head_neck_junction_anterosuperior);
  const camOut = cam.clone().projectOnPlane(NECK).normalize();
  const camQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), NECK);
  const camPos = cam.clone().add(camOut.multiplyScalar(0.0012)).add(NECK.clone().multiplyScalar(-0.002));

  // Gluteus medius from the outer ilium to the greater trochanter, passing lateral to the joint.
  const gmO = v(L.gluteus_medius_origin);
  const gmI = v(L.gluteus_medius_insertion);
  const glute = useMemo(() => {
    // A fan: broad origin along the outer ilium, narrowing to the greater trochanter.
    const fan = (tEnd: number) => {
      const cols = 10;
      const rows = 16;
      const pos: number[] = [];
      for (let r = 0; r <= rows; r++) {
        const t = (r / rows) * tEnd;
        for (let c = 0; c <= cols; c++) {
          const sCol = c / cols - 0.5; // -0.5 posterior .. +0.5 anterior
          const top = gmO.clone().add(new THREE.Vector3(-0.004, 0.012 - Math.abs(sCol) * 0.02, sCol * 0.075));
          const bottom = gmI.clone().add(new THREE.Vector3(-0.002, 0.004, sCol * 0.014));
          const q = top.lerp(bottom, t);
          q.x -= Math.sin(t * Math.PI) * 0.007 + 0.002; // sits on, and bulges out from, the outer ilium
          pos.push(q.x, q.y, q.z);
        }
      }
      const idx: number[] = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const a = r * (cols + 1) + c;
          const b = a + cols + 1;
          idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    };
    return { full: fan(1), torn: fan(0.86) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group scale={S}>
      <Bone {...p} id="pelvis" node={nodes.pelvis} />
      {!hideFemur && <Bone {...p} id="femur" node={nodes.femur} />}

      <Part {...p} id="cartilage" color={CARTILAGE} geometry={geo.cartilage} side={THREE.BackSide} roughness={0.9} opacity={0.85} />

      {stage === "before" ? (
        <>
          <Part {...p} id="labrum" color={LABRUM} geometry={geo.labrumIntact} roughness={0.4} />
          <Part {...p} id="labrum" color={TEAR} geometry={geo.labrumTear} roughness={0.4} />
          <Part {...p} id="pincer" color={BUMP} geometry={geo.pincer} />
          {!hideFemur && (
            <Part {...p} id="cam" color={BUMP} position={camPos} quaternion={camQ} scale={[0.0042, 0.0065, 0.0042]}>
              <sphereGeometry args={[1, 32, 24]} />
            </Part>
          )}
        </>
      ) : (
        <>
          <Part {...p} id="labrum" color={graft ? GRAFT : LABRUM} geometry={geo.labrumFull} roughness={0.4} />
          {ANCHOR_IDX.map((i) => {
            const a = rimAt(i, -0.0012, 0.0002);
            return (
              <Part key={i} {...p} id="labrum" color={ANCHOR} position={a}>
                <sphereGeometry args={[0.0013, 16, 12]} />
              </Part>
            );
          })}
        </>
      )}

      {!hideFemur && <Capsule {...p} id="capsule" />}

      {showGlute && (
        <>
          <Part {...p} id="gluteus-medius" color={MUSCLE} geometry={stage === "before" ? glute.torn : glute.full} opacity={0.9} side={THREE.DoubleSide} />
          {stage === "before" ? (
            <Part {...p} id="gluteus-medius" color={TEAR} position={gmI.clone().add(new THREE.Vector3(-0.004, 0.003, 0))} scale={[0.004, 0.0018, 0.005]}>
              <sphereGeometry args={[1, 16, 12]} />
            </Part>
          ) : (
            [0, 1].map((k) => (
              <Part key={k} {...p} id="gluteus-medius" color={ANCHOR} position={gmI.clone().add(new THREE.Vector3(-0.0035, 0.004 - k * 0.006, 0.003))}>
                <sphereGeometry args={[0.0013, 16, 12]} />
              </Part>
            ))
          )}
        </>
      )}
    </group>
  );
}

// Camera presets in scaled scene units (target near the joint).
const TARGET: [number, number, number] = [-0.4, 0.6, 0];
const VIEWS: Record<ViewId, { pos: [number, number, number]; target: [number, number, number] }> = {
  front: { pos: [-0.8, 1.2, 18.5], target: TARGET },
  side: { pos: [-18.5, 1.2, 2.5], target: TARGET },
  inside: {
    pos: RIM_N.clone().multiplyScalar(S * 0.15).add(ACET_C.clone().multiplyScalar(S)).toArray() as [number, number, number],
    target: ACET_C.clone().multiplyScalar(S).toArray() as [number, number, number],
  },
};

function CameraRig({ view, controls }: { view: ViewId; controls: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  useEffect(() => {
    const vw = VIEWS[view];
    camera.position.set(...vw.pos);
    controls.current?.target.set(...vw.target);
    controls.current?.update();
  }, [view, camera, controls]);
  return null;
}

export default function HipModel3D({
  selected,
  onSelect,
  stage,
  view,
  showGlute,
  graft,
  hideFemur,
  autoRotate,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  stage: Stage;
  view: ViewId;
  showGlute: boolean;
  graft: boolean;
  hideFemur: boolean;
  autoRotate: boolean;
}) {
  const controls = useRef<OrbitControlsImpl | null>(null);
  return (
    <Canvas camera={{ position: VIEWS.front.pos, fov: 38, near: 0.05, far: 200 }} dpr={[1, 2]} gl={{ antialias: true, preserveDrawingBuffer: true }} aria-hidden="true">
      <color attach="background" args={["#0c1124"]} />
      <hemisphereLight args={["#ffffff", "#3a4366", 0.75]} />
      <directionalLight position={[-6, 8, 10]} intensity={1.7} />
      <directionalLight position={[8, -2, -6]} intensity={0.5} />
      <Suspense fallback={null}>
        <Scene selected={selected} onSelect={onSelect} stage={stage} showGlute={showGlute} graft={graft} hideFemur={hideFemur} />
      </Suspense>
      <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={1.5} maxDistance={25} autoRotate={autoRotate} autoRotateSpeed={0.5} />
      <CameraRig view={view} controls={controls} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL, false, true);
