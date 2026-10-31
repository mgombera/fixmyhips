"use client";

import type { PartId, Stage } from "./parts";

// 2D fallback when WebGL is unavailable. Decorative drawing: the parts list
// beside it is the accessible way to explore.
export function Hip2D({ selected, onSelect, stage }: { selected: PartId | null; onSelect: (id: PartId) => void; stage: Stage }) {
  const hl = (id: PartId) => (selected === id ? "#4db8ff" : undefined);
  return (
    <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden="true">
      <g onClick={() => onSelect("pelvis")} style={{ cursor: "pointer" }}>
        <path d="M30 40 H370 V150 Q370 160 360 160 H290 A90 90 0 0 0 110 160 H40 Q30 160 30 150 Z" fill="#e9dfcd" stroke={hl("pelvis") ?? "#8a9ab3"} strokeWidth="3" />
      </g>
      <path d="M290 160 A90 90 0 0 0 110 160" fill="none" stroke={hl("cartilage") ?? "#b9d3e8"} strokeWidth="9" onClick={() => onSelect("cartilage")} style={{ cursor: "pointer" }} />
      <g onClick={() => onSelect("femur")} style={{ cursor: "pointer" }} stroke={hl("femur") ?? "#8a9ab3"} strokeWidth="3" fill="#e9dfcd">
        <rect x="190" y="200" width="70" height="140" rx="30" transform="rotate(-40 225 270)" />
        <ellipse cx="300" cy="290" rx="40" ry="32" />
        <rect x="250" y="290" width="70" height="130" rx="18" />
        <circle cx="200" cy="170" r="78" />
      </g>
      <g onClick={() => onSelect("labrum")} style={{ cursor: "pointer" }}>
        <path d="M102 156 L124 156 L113 190 Z" fill={stage === "before" ? "#ff5a5a" : hl("labrum") ?? "#4db8ff"} />
        <path d="M276 156 L298 156 L288 190 Z" fill={hl("labrum") ?? "#4db8ff"} />
      </g>
      {stage === "before" && (
        <ellipse cx="262" cy="222" rx="18" ry="12" fill="#ff9b57" stroke={hl("cam") ?? "#c47a1f"} strokeWidth="3" onClick={() => onSelect("cam")} style={{ cursor: "pointer" }} />
      )}
      <ellipse cx="210" cy="200" rx="150" ry="118" fill="none" stroke={hl("capsule") ?? "#d8c7f0"} strokeWidth="3" strokeDasharray="6 6" onClick={() => onSelect("capsule")} style={{ cursor: "pointer" }} />
    </svg>
  );
}
