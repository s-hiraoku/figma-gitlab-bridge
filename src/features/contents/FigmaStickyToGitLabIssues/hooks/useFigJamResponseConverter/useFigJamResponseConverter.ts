import { useCallback, useMemo } from "react";
import { Figma } from "@types";
import {
  StickyNote,
  isStickyNode,
  parseFigmaId,
  isNodeWithChildren,
  rgbaToHexWithoutAlpha,
} from "../../utils";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { FIGJAM_COLOR_VALUE, FigJamColor } from "../../types";

export type UseFigJamResponseConverter = () => {
  converter: (
    figmaUrl: string,
    pickColor: FigJamColor,
    fileResponse: Figma.FileResponse | undefined
  ) => StickyNote[];
};

export const useFigJamResponseConverter: UseFigJamResponseConverter = () => {
  const { data: settings } = useSettings();

  const figmaAPIEndpoint = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return findValueInSettingsByKey(
      adjustedSettings,
      SETTING_KEY.figmaAPIEndpoint
    );
  }, [settings]);

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
      fileResponse: Figma.FileResponse | undefined
    ): StickyNote[] => {
      if (fileResponse == null) {
        return [];
      }
      const figmaId = parseFigmaId(figmaUrl);
      const { document } = fileResponse;
      const { children } = document;

      const searchStickyNotes = (node: Figma.Node): StickyNote[] => {
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
