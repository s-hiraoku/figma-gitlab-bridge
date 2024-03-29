import { useCallback } from "react";
import { Figma } from "@types";
import {
  StickyNote,
  isStickyNode,
  parseFigmaId,
  isNodeWithChildren,
  rgbaToHexWithoutAlpha,
  isSectionNode,
} from "../../contents/FigmaStickyToGitLabIssues/utils";
import {
  FIGJAM_COLOR_VALUE,
  FigJamColor,
} from "../../contents/FigmaStickyToGitLabIssues/types";
import { useFigmaSettings } from "@features/hooks/useFigmaSettings";

export type UseFigJamResponseConverter = () => {
  converter: (
    figmaUrl: string,
    pickColor: FigJamColor,
    fileResponse: Figma.FileResponse | undefined,
    sections: string[] | undefined
  ) => StickyNote[];
  getSections: (fileResponse: Figma.FileResponse | undefined) => string[];
};

export const useFigJamResponseConverter: UseFigJamResponseConverter = () => {
  const { getFigmaUrl } = useFigmaSettings();

  const figmaUrl = getFigmaUrl();

  const createFigmaNodeURL = useCallback(
    (figmaId: string, nodeId: string) => {
      return `${figmaUrl}/file/${figmaId}?node-id=${nodeId}`;
    },
    [figmaUrl]
  );

  const convertFileResponseToSectionsAndStickyNotes = useCallback(
    (
      figmaUrl: string,
      pickColor: FigJamColor,
      fileResponse: Figma.FileResponse | undefined,
      sections: string[] | undefined
    ): StickyNote[] => {
      if (fileResponse == null) {
        return [];
      }
      const figmaId = parseFigmaId(figmaUrl);
      const { document } = fileResponse;
      const { children } = document;
      let currentSectionName: string | undefined;

      const searchStickyNotes = (
        node: Figma.Node,
        isIncludedSection = false
      ): StickyNote[] => {
        if (isSectionNode(node)) {
          const isIncluded =
            sections == null ||
            sections.some((section) => section === node.name);
          currentSectionName = node.name;
          return node.children.flatMap((child) =>
            searchStickyNotes(child, isIncluded)
          );
        }

        if (isStickyNode(node) && isIncludedSection) {
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
            sectionName: currentSectionName ?? "",
            text,
            url,
          };
          return [stickyNote];
        }

        if (isNodeWithChildren(node)) {
          return node.children.flatMap((child) =>
            searchStickyNotes(child, isIncludedSection)
          );
        }

        return [];
      };

      const stickyNotes: StickyNote[] = children.flatMap((child) =>
        searchStickyNotes(child, sections == null)
      );

      return stickyNotes;
    },
    [createFigmaNodeURL]
  );

  const getSections = useCallback(
    (fileResponse: Figma.FileResponse | undefined): string[] => {
      if (fileResponse == null) {
        return [];
      }

      const { document } = fileResponse;
      const { children } = document;

      const searchSections = (node: Figma.Node): string[] => {
        if (!isNodeWithChildren(node)) {
          return isSectionNode(node) ? [node.name] : [];
        }

        if (isSectionNode(node)) {
          return [node.name, ...node.children.flatMap(searchSections)];
        }

        return node.children.flatMap(searchSections);
      };

      return children.flatMap(searchSections);
    },
    []
  );

  return {
    converter: convertFileResponseToSectionsAndStickyNotes,
    getSections,
  };
};
