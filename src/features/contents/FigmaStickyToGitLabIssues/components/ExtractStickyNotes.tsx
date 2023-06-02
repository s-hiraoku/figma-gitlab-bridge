import { SelectFigJamSticky } from "@features/SelectFigJamSticky";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

type Props = {
  onExtractStickyNoteClick: () => void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  onExtractStickyNoteClick,
}) => {
  const handleFigJamStickyChange = (color: string) => {};

  const handleExtractStickyNoteClick = () => {
    onExtractStickyNoteClick();
    console.log("handleExtractStickyNoteClick");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box sx={{ width: 200 }}>
        <SelectFigJamSticky onChange={handleFigJamStickyChange} />
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
