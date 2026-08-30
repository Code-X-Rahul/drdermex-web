import type { BodySide } from "@/interfaces/diagnosis";

/**
 * Wire values for `howMuchBodyAffected`. The backend stores this as a free-form
 * string and validates nothing, so these must match the mobile app exactly or
 * the app cannot resume a draft created on web.
 */
export const AFFECTED_EXTENT_OPTIONS = [
  { value: "Single Spot", description: "A single growth or spot" },
  {
    value: "Limited Area",
    description: "Multiple spots or rash involving 1 or more areas of the body",
  },
  { value: "Widespread", description: "Affecting most of the body" },
] as const;

/** Wire values for `conditionMap['condition duration']`. */
export const CONDITION_DURATION_OPTIONS = [
  "Minutes to Hours",
  "Day to Weeks",
  "Weeks to Months",
  "Months to Years",
  "Recurring Episodes",
] as const;

/**
 * `conditionMap` is a free-form JSON blob the backend never inspects, so these
 * exact keys ARE the contract — they are what the mobile app reads back when
 * resuming a draft. Do not "tidy" the spacing or casing.
 */
export const CONDITION_MAP_KEYS = {
  DURATION: "condition duration",
  ITCH: "Does_it_itch",
  FEVER: "Do_you_have_a_fever",
} as const;

/**
 * Maps each `<path id>` in the body-frame SVGs to the human label that is
 * actually sent to and stored by the API. Ported verbatim from the mobile app
 * (`body_region_selector_screen.dart`).
 *
 * Several ids are counter-intuitive and MUST NOT be "corrected":
 *   front-upperBody → Chest,  front-lowerBody → Abdomen,  front-abdomen → Groin
 * The app matches these labels case-insensitively when rehydrating a draft, so
 * renaming any of them silently strands the user's data.
 */
export const BODY_PART_LABELS: Record<string, string> = {
  // Front
  "front-head": "Face",
  "front-neck": "Neck",
  "front-forehead": "Forehead",
  "front-leftShoulder": "Left Shoulder",
  "front-leftUpperArm": "Left Upper Arm",
  "front-leftLowerArm": "Left Forearm",
  "front-leftHand": "Left Hand",
  "front-rightShoulder": "Right Shoulder",
  "front-rightUpperArm": "Right Upper Arm",
  "front-rightLowerArm": "Right Forearm",
  "front-rightHand": "Right Hand",
  "front-upperBody": "Chest",
  "front-abdomen": "Groin",
  "front-lowerBody": "Abdomen",
  "front-leftUpperLeg": "Left Thigh",
  "front-leftKnee": "Left Knee",
  "front-leftLowerLeg": "Left Shin",
  "front-leftFoot": "Left Foot",
  "front-rightUpperLeg": "Right Thigh",
  "front-rightKnee": "Right Knee",
  "front-rightLowerLeg": "Right Shin",
  "front-rightFoot": "Right Foot",
  // Back
  "back-head": "Scalp",
  "back-neck": "Back of Neck",
  "back-leftShoulder": "Left Shoulder (Back)",
  "back-leftUpperArm": "Left Upper Arm (Back)",
  "back-leftLowerArm": "Left Forearm (Back)",
  "back-leftElbow": "Left Elbow",
  "back-leftHand": "Left Hand (Back)",
  "back-rightShoulder": "Right Shoulder (Back)",
  "back-rightUpperArm": "Right Upper Arm (Back)",
  "back-rightLowerArm": "Right Forearm (Back)",
  "back-rightElbow": "Right Elbow",
  "back-rightHand": "Right Hand (Back)",
  "back-upperBody": "Upper Back",
  "back-abdomen": "Lower Back",
  "back-lowerBody": "Buttocks",
  "back-leftUpperLeg": "Left Thigh (Back)",
  "back-leftLowerLeg": "Left Calf",
  "back-leftFoot": "Left Heel",
  "back-rightUpperLeg": "Right Thigh (Back)",
  "back-rightLowerLeg": "Right Calf",
  "back-rightFoot": "Right Heel",
};

/** Ids present in the SVG that are structure, not selectable regions. */
const NON_SELECTABLE_IDS = new Set([
  "m_front",
  "m_back",
  "back-defs197",
  "back-namedview125",
  "back-false",
]);

export const isSelectableBodyPart = (id: string): boolean =>
  !NON_SELECTABLE_IDS.has(id) && id in BODY_PART_LABELS;

export const bodyPartLabel = (id: string): string =>
  BODY_PART_LABELS[id] ?? id;

/** Reverse lookup, matching the app's case-insensitive label comparison. */
export const bodyPartIdsFromLabels = (labels: string[]): string[] => {
  const wanted = new Set(labels.map((l) => l.toLowerCase()));
  return Object.keys(BODY_PART_LABELS).filter((id) =>
    wanted.has(BODY_PART_LABELS[id].toLowerCase())
  );
};

export const sideOfBodyPart = (id: string): BodySide =>
  id.startsWith("back-") ? "back" : "front";

/**
 * `bodyLocation` is sent as "Label, Label (Side)" — e.g. "Chest, Neck (Front)".
 */
export const formatBodyLocation = (
  selectedIds: string[],
  side: BodySide
): string => {
  if (selectedIds.length === 0) return "";
  const labels = selectedIds.map(bodyPartLabel).join(", ");
  return `${labels} (${side === "front" ? "Front" : "Back"})`;
};

export const BODY_FRAME_SVG: Record<BodySide, string> = {
  front: "/bodyFrame/m_front.svg",
  back: "/bodyFrame/m_back.svg",
};
