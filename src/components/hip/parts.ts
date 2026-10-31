export type PartId = "labrum" | "cartilage" | "cam" | "pincer" | "capsule" | "gluteus-medius" | "femur" | "pelvis";
export type ViewId = "front" | "side" | "inside";
export type Stage = "before" | "after";

/** Parts with patient text in content/learn.ts (ANATOMY), in list order. */
export const EXPLAINED: PartId[] = ["labrum", "cartilage", "cam", "pincer", "capsule", "gluteus-medius"];

export const BONE_TEXT: Record<"femur" | "pelvis", { title: string; text: string }> = {
  femur: { title: "Femur", text: "The thigh bone. Its ball (femoral head) fits into the socket of the pelvis." },
  pelvis: { title: "Pelvis and socket", text: "The socket of the hip (acetabulum) is part of the pelvis." },
};

export const STAGE_NOTE: Record<Stage, Record<PartId, string | null>> = {
  before: {
    labrum: "Shown torn (red) at the rim of the socket.",
    cartilage: null,
    cam: "Shown in orange at the junction of the ball and neck.",
    pincer: "Shown in orange as extra rim coverage.",
    capsule: null,
    "gluteus-medius": "Shown torn from the bone (red) where it attaches.",
    femur: null,
    pelvis: null,
  },
  after: {
    labrum: "Shown repaired to the rim with anchors (white).",
    cartilage: null,
    cam: "Reshaped during surgery, so it no longer shows.",
    pincer: "Reshaped during surgery, so it no longer shows.",
    capsule: null,
    "gluteus-medius": "Shown reattached to the bone with anchors (white).",
    femur: null,
    pelvis: null,
  },
};
