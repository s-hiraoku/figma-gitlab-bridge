import { useCallback } from "react";
import { Figma } from "@types";
import {
  StickyNote,
  isStickyNode,
  parseFigmaId,
  isNodeWithChildren,
  rgbaToHexWithoutAlpha,
  isSectionNode,
} from "../../utils";
import { FIGJAM_COLOR_VALUE, FigJamColor } from "../../types";
import { useFigmaSettings } from "@hooks/useFigmaSettings";

export type UseFigJamResponseConverter = () => {
  converter: (
    figmaUrl: string,
    pickColor: FigJamColor,
    fileResponse: Figma.FileResponse | undefined,
    sections?: string[]
  ) => StickyNote[];
};

export const useFigJamResponseConverter: UseFigJamResponseConverter = () => {
  const { getFigmaAPIEndpoint } = useFigmaSettings();

  const figmaAPIEndpoint = getFigmaAPIEndpoint();

  const createFigmaNodeURL = useCallback(
    (figmaId: string, nodeId: string) => {
      return `${figmaAPIEndpoint}/files/${figmaId}?node-id=${nodeId}`;
    },
    [figmaAPIEndpoint]
  );

  const convertFileResponseToStickyNotes = useCallback(
    (
      figmaUrl: string,
      pickColor: FigJamColor,
      fileResponse: Figma.FileResponse | undefined,
      sections?: string[]
    ): StickyNote[] => {
      if (fileResponse == null) {
        return [];
      }
      const figmaId = parseFigmaId(figmaUrl);
      const { document } = fileResponse;
      const { children } = document;

      const searchStickyNotes = (node: Figma.Node): StickyNote[] => {
        if (isSectionNode(node)) {
          const { name, children } = node;
          if (
            sections == null ||
            sections.some((section) => section === name)
          ) {
            return children.flatMap(searchStickyNotes);
          }
        }
        if (isStickyNode(node)) {
          const { id, characters: text, fills } = node;
          if (
            pickColor.value !== FIGJAM_COLOR_VALUE.All &&
            rgbaToHexWithoutAlpha(fills[0].color).toUpperCase() !==
              pickColor.value
          ) {
            return [];
          }
          const url = createFigmaNodeURL(figmaId ?? "", id);
          const stickyNote: StickyNote = {
            text,
            url,
          };
          return [stickyNote];
        }
        if (!isNodeWithChildren(node)) return [];
        return node.children.flatMap(searchStickyNotes);
      };

      const stickyNotes: StickyNote[] = children.flatMap(searchStickyNotes);

      return stickyNotes;
    },
    [createFigmaNodeURL]
  );

  return { converter: convertFileResponseToStickyNotes };
};
