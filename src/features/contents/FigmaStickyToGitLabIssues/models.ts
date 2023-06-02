import { valueOf } from "@types";

export type status =
  | "initialStage"
  | "fileSetupCompleted"
  | "extractStickyNote";

export const STATUS: Record<status, number> = {
  initialStage: 0,
  fileSetupCompleted: 1,
  extractStickyNote: 2,
} as const;

export type StatusType = valueOf<typeof STATUS>;
