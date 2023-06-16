import { SelectFigJamSticky } from "@features/SelectFigJamSticky";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FigJamColor } from "../types";

type Props = {
  onChangeSelectStickyColor: (color: FigJamColor) => void;
  onClickExtractStickyNote: () => void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  onChangeSelectStickyColor,
  onClickExtractStickyNote,
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
      <Box sx={{ width: 264 }}>
        <SelectFigJamSticky onChange={onChangeSelectStickyColor} />
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
