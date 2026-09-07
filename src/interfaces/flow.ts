export const FLOW_STEPS = [
  "login",
  "verify",
  "profile",
  "upload",
  "extent",
  "area",
  "condition",
  "summary",
  "payment",
  "done",
] as const;

export type FlowStep = (typeof FLOW_STEPS)[number];

export const isFlowStep = (value: string | null): value is FlowStep =>
  value !== null && (FLOW_STEPS as readonly string[]).includes(value);

/** Steps that make up the questionnaire progress bar (auth is not shown). */
export const PROGRESS_STEPS: FlowStep[] = [
  "upload",
  "extent",
  "area",
  "condition",
  "summary",
];
