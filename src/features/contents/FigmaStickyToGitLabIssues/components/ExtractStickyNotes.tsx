import { SelectFigJamSticky } from "@features/SelectFigJamSticky";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

type Props = {
  onExtractStickyNoteClick: () => void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  onExtractStickyNoteClick,
}) => {
  const [selectStickyColor, setSelectStickyColor] = React.useState<string>("");
  const [error, setError] = React.useState(false);
  const handleFigJamStickyChange = (color: string) => {
    setSelectStickyColor(color);
  };

  const checkSelectStickyColor = useCallback(() => {
    if (selectStickyColor === "") {
      return false;
    }
    return true;
  }, [selectStickyColor]);

  const handleExtractStickyNoteClick = useCallback(() => {
    if (checkSelectStickyColor()) {
      setError(false);
      onExtractStickyNoteClick();
      return;
    }
    setError(true);
  }, [checkSelectStickyColor, onExtractStickyNoteClick]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box sx={{ width: 264 }}>
        <SelectFigJamSticky onChange={handleFigJamStickyChange} error={error} />
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
