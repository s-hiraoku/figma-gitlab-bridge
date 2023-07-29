import { valueOf } from "@types";

export type FigJamColorValue =
  | "all"
  | "#AFBCCF"
  | "#E6E6E6"
  | "#80CAFF"
  | "#9747FF"
  | "#FFBDF2"
  | "#FFAFA3"
  | "#FFC470"
  | "#FFD966"
  | "#86E0A3"
  | "#75D7F0";

export type FigJamColorLabel =
  | "All"
  | "Gray"
  | "Light Gray"
  | "Blue"
  | "Purple"
  | "Pink"
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue Green";

export type FigJamColor = {
  label: FigJamColorLabel;
  value: FigJamColorValue;
};

export type FigJamStatus =
  | "initialStage"
  | "extractStickyNotes"
  | "editImportData"
  | "confirmImportData";

export const FIGJAM_STATUS: Record<FigJamStatus, number> = {
  initialStage: 0,
  extractStickyNotes: 1,
  editImportData: 2,
  confirmImportData: 3,
} as const;

export type FigJamStatusType = valueOf<typeof FIGJAM_STATUS>;

export const FIGJAM_COLOR_VALUE: Record<FigJamColorLabel, FigJamColorValue> = {
  All: "all",
  Gray: "#AFBCCF",
  "Light Gray": "#E6E6E6",
  Blue: "#80CAFF",
  Purple: "#9747FF",
  Pink: "#FFBDF2",
  Red: "#FFAFA3",
  Orange: "#FFC470",
  Yellow: "#FFD966",
  Green: "#86E0A3",
  "Blue Green": "#75D7F0",
} as const;

export const FIGJAM_COLOR_LABEL: Record<FigJamColorLabel, FigJamColorLabel> = {
  All: "All",
  Gray: "Gray",
  "Light Gray": "Light Gray",
  Blue: "Blue",
  Purple: "Purple",
  Pink: "Pink",
  Red: "Red",
  Orange: "Orange",
  Yellow: "Yellow",
  Green: "Green",
  "Blue Green": "Blue Green",
} as const;

export const DEFAULT_FIGMA_STICKY_COLOR: FigJamColor = {
  label: FIGJAM_COLOR_LABEL.All,
  value: FIGJAM_COLOR_VALUE.All,
};

export type Sections = string[] | undefined;
