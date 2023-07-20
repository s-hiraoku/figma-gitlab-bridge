import { SelectFigJamSticky, SelectFigJamSections } from "@features/components";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FigJamColor } from "../types";

type Props = {
  sections: string[] | undefined;
  onChangeSelectStickyColor: (color: FigJamColor) => void;
  onClickExtractStickyNote: () => void;
  onChangeSelectSections(sections: string[]): void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  sections,
  onChangeSelectStickyColor,
  onClickExtractStickyNote,
  onChangeSelectSections,
}) => {
  const handleExtractStickyNoteClick = useCallback(() => {
    onClickExtractStickyNote();
  }, [onClickExtractStickyNote]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" gap="80px">
        <Box sx={{ width: 264 }}>
          <SelectFigJamSections
            sections={sections}
            onChange={onChangeSelectSections}
          />
        </Box>
        <Box sx={{ width: 264 }}>
          <SelectFigJamSticky onChange={onChangeSelectStickyColor} />
        </Box>
      </Box>
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        sx={{ mt: 4 }}
        onClick={handleExtractStickyNoteClick}
      >
        Extraction of sticky notes
      </Button>
    </Box>
  );
};
