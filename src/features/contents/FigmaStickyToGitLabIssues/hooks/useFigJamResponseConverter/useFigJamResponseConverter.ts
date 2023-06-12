import { useMemo } from "react";
import { Figma } from "@types";
import {
  StickyNote,
  isStickyNode,
  parseFigmaId,
  isNodeWithChildren,
} from "../../utils";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";

export type UseFigJamResponseConverter = () => {
  converter: (
    figmaUrl: string,
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

  const createFigmaNodeURL = (figmaId: string, nodeId: string) => {
    return `${figmaAPIEndpoint}/files/${figmaId}?node-id=${nodeId}`;
  };

  const convertFileResponseToStickyNotes = (
    figmaUrl: string,
    fileResponse: Figma.FileResponse | undefined
  ): StickyNote[] => {
    if (fileResponse == null) {
      return [];
    }
    const figmaId = parseFigmaId(figmaUrl);
    const { document } = fileResponse;
    const { children } = document;

    const searchStickyNotes = (node: Figma.Node): StickyNote[] => {
      console.log(node);
      if (isStickyNode(node)) {
        const { id, characters: text } = node;
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
  };

  return { converter: convertFileResponseToStickyNotes };
};
