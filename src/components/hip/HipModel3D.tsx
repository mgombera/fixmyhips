"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { PartId, ViewId, Stage } from "./parts";

// A stylized right hip built from simple shapes (no external model files).
// Units: femoral head radius 0.5. +x lateral, +y up, +z anterior.

const BONE = "#e9dfcd";
const CARTILAGE = "#b9d3e8";
const LABRUM = "#4db8ff";
const GRAFT = "#7fd1a8";
const TEAR = "#ff5a5a";
const CAM = "#ff9b57";
const MUSCLE = "#c0605a";
const ANCHOR = "#f4f6fa";

const CUP_DIR = new THREE.Vector3(1, -0.55, 0.35).normalize(); // acetabular opening
const RIM_R = 0.6;

function basis(n: THREE.Vector3) {
  const u = new THREE.Vector3(0, 1, 0).cross(n).normalize();
  const v = n.clone().cross(u).normalize();
  return { u, v };
}
const { u: RIM_U, v: RIM_V } = basis(CUP_DIR);
/** Point on the acetabular rim. angle 0 = superior-anterior, increasing anteriorly. */
function rimPoint(angle: number, r = RIM_R) {
  return RIM_U.clone().multiplyScalar(Math.cos(angle) * r).add(RIM_V.clone().multiplyScalar(Math.sin(angle) * r));
}

type MeshProps = {
  id: PartId;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  color: string;
  opacity?: number;
  children: React.ReactNode;
  position?: [number, number, number];
  quaternion?: THREE.Quaternion;
  scale?: [number, number, number];
  side?: THREE.Side;
};

function Part({ id, selected, onSelect, color, opacity = 1, children, position, quaternion, scale, side }: MeshProps) {
  const active = selected === id;
  const [hover, setHover] = useState(false);
  return (
    <mesh
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
        roughness={0.55}
        metalness={0.05}
        transparent={opacity < 1}
        opacity={opacity}
        side={side ?? THREE.FrontSide}
        depthWrite={opacity >= 1}
        emissive={color}
        emissiveIntensity={active ? 0.45 : hover ? 0.22 : 0}
      />
    </mesh>
  );
}

function Cylinder({ from, to, radius, ...rest }: Omit<MeshProps, "children"> & { from: THREE.Vector3; to: THREE.Vector3; radius: [number, number] }) {
  const dir = to.clone().sub(from);
  const len = dir.length();
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return (
    <Part {...rest} position={[mid.x, mid.y, mid.z]} quaternion={q}>
      <cylinderGeometry args={[radius[1], radius[0], len, 40, 1]} />
    </Part>
  );
}

function Scene({
  selected,
  onSelect,
  stage,
  showGlute,
  graft,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  stage: Stage;
  showGlute: boolean;
  graft: boolean;
}) {
  const p = { selected, onSelect };
  const cupQ = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), CUP_DIR), []);
  const rimQ = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), CUP_DIR), []);
  const rimCenter = CUP_DIR.clone().multiplyScalar(0.02);

  // Femur landmarks
  const neckEnd = new THREE.Vector3(1.05, -0.78, 0.05);
  const shaftTop = new THREE.Vector3(1.12, -0.55, 0);
  const shaftBottom = new THREE.Vector3(1.0, -3.0, 0);
  const gt = new THREE.Vector3(1.45, -0.55, -0.05);
  const camPos = new THREE.Vector3(0.48, 0.05, 0.22);
  const tearStart = -0.35; // radians on the rim (superior-anterior)
  const tearLen = 0.9;

  const anchors = [-0.25, 0.1, 0.45].map((a) => rimPoint(a, RIM_R + 0.02));
  const gluteOrigin = new THREE.Vector3(-0.1, 1.7, -0.25);
  const gluteInsert = gt.clone().add(new THREE.Vector3(0.05, 0.25, 0));
  const glutePath = useMemo(
    () => new THREE.CatmullRomCurve3([gluteOrigin, new THREE.Vector3(1.0, 0.9, -0.35), new THREE.Vector3(1.5, 0.2, -0.2), gluteInsert]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <group rotation={[0, -0.35, 0]} position={[-0.3, 0.25, 0]}>
      {/* Pelvis: ilium blade, pubis and ischium */}
      <Part {...p} id="pelvis" color={BONE} position={[-0.35, 1.35, -0.15]} scale={[1.05, 1.15, 0.28]} quaternion={new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, 0, -0.25))}>
        <sphereGeometry args={[1, 48, 32]} />
      </Part>
      <Cylinder {...p} id="pelvis" color={BONE} from={new THREE.Vector3(-0.2, -0.1, 0.25)} to={new THREE.Vector3(-1.6, -0.35, 0.75)} radius={[0.26, 0.2]} />
      <Cylinder {...p} id="pelvis" color={BONE} from={new THREE.Vector3(-0.1, -0.35, -0.2)} to={new THREE.Vector3(-0.35, -1.45, -0.45)} radius={[0.3, 0.24]} />
      {/* Acetabular cup (outer bone) */}
      <Part {...p} id="pelvis" color={BONE} quaternion={cupQ} side={THREE.DoubleSide}>
        <sphereGeometry args={[0.74, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </Part>

      {/* Cartilage lining of the socket */}
      <Part {...p} id="cartilage" color={CARTILAGE} quaternion={cupQ} side={THREE.DoubleSide}>
        <sphereGeometry args={[0.56, 48, 24, 0, Math.PI * 2, 0.05, Math.PI / 2 - 0.08]} />
      </Part>

      {/* Pincer: extra rim coverage (before only) */}
      {stage === "before" && (
        <Part {...p} id="pincer" color={CAM} position={[rimCenter.x, rimCenter.y, rimCenter.z]} quaternion={rimQ}>
          <torusGeometry args={[RIM_R + 0.14, 0.07, 16, 48, 1.1]} />
        </Part>
      )}

      {/* Labrum: torn segment before, repaired (or graft) after */}
      <group position={[rimCenter.x, rimCenter.y, rimCenter.z]} quaternion={rimQ}>
        {stage === "before" ? (
          <>
            <group rotation={[0, 0, tearStart + tearLen]}>
              <Part {...p} id="labrum" color={LABRUM}>
                <torusGeometry args={[RIM_R, 0.065, 16, 96, Math.PI * 2 - tearLen]} />
              </Part>
            </group>
            <group rotation={[0, 0, tearStart]}>
              <Part {...p} id="labrum" color={TEAR}>
                <torusGeometry args={[RIM_R, 0.075, 16, 32, tearLen]} />
              </Part>
            </group>
          </>
        ) : (
          <Part {...p} id="labrum" color={graft ? GRAFT : LABRUM}>
            <torusGeometry args={[RIM_R, 0.065, 16, 96]} />
          </Part>
        )}
      </group>
      {stage === "after" &&
        anchors.map((a, i) => (
          <Part key={i} {...p} id="labrum" color={ANCHOR} position={[a.x, a.y, a.z]}>
            <sphereGeometry args={[0.045, 16, 12]} />
          </Part>
        ))}

      {/* Femur: head, neck, greater and lesser trochanter, shaft */}
      <Part {...p} id="femur" color={BONE}>
        <sphereGeometry args={[0.5, 48, 32]} />
      </Part>
      <Cylinder {...p} id="femur" color={BONE} from={new THREE.Vector3(0.2, -0.12, 0.02)} to={neckEnd} radius={[0.27, 0.33]} />
      <Part {...p} id="femur" color={BONE} position={[gt.x, gt.y, gt.z]} scale={[0.38, 0.42, 0.36]}>
        <sphereGeometry args={[1, 32, 24]} />
      </Part>
      <Part {...p} id="femur" color={BONE} position={[0.82, -1.35, -0.18]} scale={[0.16, 0.18, 0.16]}>
        <sphereGeometry args={[1, 24, 16]} />
      </Part>
      <Part {...p} id="femur" color={BONE} position={[1.12, -0.72, 0]} scale={[0.4, 0.42, 0.36]}>
        <sphereGeometry args={[1, 32, 24]} />
      </Part>
      <Cylinder {...p} id="femur" color={BONE} from={shaftTop} to={shaftBottom} radius={[0.36, 0.3]} />

      {/* Cam bump at the head-neck junction (before only) */}
      {stage === "before" && (
        <Part {...p} id="cam" color={CAM} position={[camPos.x, camPos.y, camPos.z]} scale={[0.22, 0.15, 0.19]}>
          <sphereGeometry args={[1, 32, 24]} />
        </Part>
      )}

      {/* Capsule: translucent sleeve from the rim to the base of the neck */}
      <Cylinder
        {...p}
        id="capsule"
        color="#d8c7f0"
        opacity={0.22}
        side={THREE.DoubleSide}
        from={CUP_DIR.clone().multiplyScalar(-0.05)}
        to={new THREE.Vector3(1.0, -0.75, 0.05)}
        radius={[0.82, 0.55]}
      />

      {/* Gluteus medius (shown for the gluteus medius procedure) */}
      {showGlute && (
        <>
          <Part {...p} id="gluteus-medius" color={MUSCLE}>
            <tubeGeometry args={[glutePath, 48, 0.17, 16, false]} />
          </Part>
          {stage === "before" ? (
            <Part {...p} id="gluteus-medius" color={TEAR} position={[gluteInsert.x, gluteInsert.y - 0.12, gluteInsert.z]} scale={[0.14, 0.05, 0.14]}>
              <sphereGeometry args={[1, 16, 12]} />
            </Part>
          ) : (
            [0, 1].map((i) => (
              <Part key={i} {...p} id="gluteus-medius" color={ANCHOR} position={[gt.x + 0.15, gt.y + 0.12 - i * 0.16, gt.z + 0.08]}>
                <sphereGeometry args={[0.045, 16, 12]} />
              </Part>
            ))
          )}
        </>
      )}
    </group>
  );
}

const VIEWS: Record<ViewId, { pos: [number, number, number]; target: [number, number, number] }> = {
  front: { pos: [0.2, 0.1, 8.6], target: [0.2, -0.1, 0] },
  side: { pos: [8.4, 0.2, 1.2], target: [0.2, -0.1, 0] },
  inside: { pos: [2.6, -0.6, 2.9], target: [-0.1, 0.25, 0] },
};

function CameraRig({ view, controls }: { view: ViewId; controls: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  useEffect(() => {
    const v = VIEWS[view];
    camera.position.set(...v.pos);
    controls.current?.target.set(...v.target);
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
  autoRotate,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  stage: Stage;
  view: ViewId;
  showGlute: boolean;
  graft: boolean;
  autoRotate: boolean;
}) {
  const controls = useRef<OrbitControlsImpl | null>(null);
  return (
    <Canvas
      camera={{ position: VIEWS.front.pos, fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      aria-hidden="true"
    >
      <color attach="background" args={["#0c1124"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <directionalLight position={[-5, -2, -4]} intensity={0.45} />
      <Scene selected={selected} onSelect={onSelect} stage={stage} showGlute={showGlute} graft={graft} />
      <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={2} maxDistance={12} autoRotate={autoRotate} autoRotateSpeed={0.6} />
      <CameraRig view={view} controls={controls} />
    </Canvas>
  );
}
