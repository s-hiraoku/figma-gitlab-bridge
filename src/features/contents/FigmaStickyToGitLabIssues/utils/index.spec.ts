import { Figma } from "@types";
import {
  isStickyNode,
  isNodeWithChildren,
  parseFigmaId,
  rgbaToHexWithoutAlpha,
  stickyNotesToText,
} from "./index";

describe("Utility functions", () => {
  // Test for isStickyNode
  it("should correctly identify a sticky node", () => {
    const stickyNode: Figma.Sticky = {
      id: "some-id",
      name: "some-name",
      type: "STICKY",
      characters: "some-characters",
      scrollBehavior: "SCROLLS",
      absoluteBoundingBox: { x: 0, y: 0, width: 0, height: 0 },
      absoluteRenderBounds: { x: 0, y: 0, width: 0, height: 0 },
      constraints: { vertical: "TOP", horizontal: "LEFT" },
      blendMode: "PASS_THROUGH",
      fills: [],
      authorVisible: true,
      effects: [],
    };
    expect(isStickyNode(stickyNode)).toBe(true);
  });

  // Test for isNodeWithChildren
  it("should correctly identify a node with children", () => {
    const frameNode: Figma.Canvas = {
      type: "CANVAS",
      children: [],
      backgroundColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
      prototypeStartNodeID: null,
      id: "",
      name: "",
    };
    expect(isNodeWithChildren(frameNode)).toBe(true);
  });

  // Test for parseFigmaId
  it("should correctly parse a Figma ID from a URL", () => {
    const figmaURL = "https://www.figma.com/file/abc123";
    expect(parseFigmaId(figmaURL)).toBe("abc123");
  });

  // Test for rgbaToHexWithoutAlpha
  it("should correctly convert an RGBA color to a hex color", () => {
    const rgbaColor = { r: 1, g: 0.5, b: 0, a: 0 };
    expect(rgbaToHexWithoutAlpha(rgbaColor)).toBe("#ff8000");
  });

  // Test for stickyNotesToText
  it("should correctly convert an array of sticky notes to text", () => {
    const stickyNotes = [
      { text: "Note 1", url: "https://www.figma.com/file/abc123" },
      { text: "Note 2", url: "https://www.figma.com/file/def456" },
    ];
    expect(stickyNotesToText(stickyNotes)).toBe(
      "Note 1,https://www.figma.com/file/abc123\nNote 2,https://www.figma.com/file/def456"
    );
  });
});
