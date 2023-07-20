import { Figma } from "@types";

export const FIGMA_NODE_TYPE: Record<Figma.NodeType, Figma.NodeType> = {
  DOCUMENT: "DOCUMENT",
  CANVAS: "CANVAS",
  FRAME: "FRAME",
  GROUP: "GROUP",
  VECTOR: "VECTOR",
  BOOLEAN_OPERATION: "BOOLEAN_OPERATION",
  STAR: "STAR",
  LINE: "LINE",
  ELLIPSE: "ELLIPSE",
  REGULAR_POLYGON: "REGULAR_POLYGON",
  RECTANGLE: "RECTANGLE",
  TEXT: "TEXT",
  SLICE: "SLICE",
  COMPONENT: "COMPONENT",
  INSTANCE: "INSTANCE",
  COMPONENT_SET: "COMPONENT_SET",
  STICKY: "STICKY",
  SECTION: "SECTION",
};

export const isStickyNode = (node: Figma.Node): node is Figma.Sticky => {
  return node.type === FIGMA_NODE_TYPE.STICKY;
};

export const isSectionNode = (
  node: Figma.Node
): node is Figma.Section & { name: string } => {
  return node.type === FIGMA_NODE_TYPE.SECTION;
};

export const isNodeWithChildren = (
  node: Figma.Node
): node is (Figma.Frame | Figma.Group | Figma.Canvas | Figma.Section) & {
  children: ReadonlyArray<Node>;
} => {
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "CANVAS" ||
    node.type === "SECTION"
  );
};

export type StickyNote = {
  text: string;
  url: string;
};

export const parseFigmaId = (figmaURL: string) => {
  const match =
    /https:\/\/([\w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/.exec(
      figmaURL
    );

  if (match != null) {
    return match[3];
  }

  return null;
};

export const rgbaToHexWithoutAlpha = (
  rgba: Figma.Color | undefined
): string => {
  if (rgba == null) {
    return "";
  }
  const { r, g, b } = rgba;
  const red = Math.round(r * 255)
    .toString(16)
    .padStart(2, "0");
  const green = Math.round(g * 255)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.round(b * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${red}${green}${blue}`;
};

export const stickyNotesToText = (stickyNotes: StickyNote[]): string => {
  return stickyNotes.map((note) => `${note.text},${note.url}`).join("\n");
};
