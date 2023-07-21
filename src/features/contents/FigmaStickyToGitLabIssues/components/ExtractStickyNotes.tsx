import { SelectFigJamSticky, SelectFigJamSections } from "@features/components";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FigJamColor } from "../types";
import { ResetButton } from "./ResetButton";

type Props = {
  sections: string[] | undefined;
  selectSections: string[] | undefined;
  onChangeSelectStickyColor: (color: FigJamColor) => void;
  onClickExtractStickyNote: () => void;
  onClickReset: () => void;
  onChangeSelectSections(sections: string[]): void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  sections,
  selectSections,
  onChangeSelectStickyColor,
  onClickExtractStickyNote,
  onClickReset,
  onChangeSelectSections,
}) => {
  const [error, setError] = useState<boolean>(false);

  const validate = useCallback(() => {
    console.log(selectSections);
    if (selectSections === undefined || selectSections.length === 0) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  }, [selectSections]);

  const handleExtractStickyNoteClick = useCallback(() => {
    if (!validate()) {
      return;
    }
    onClickExtractStickyNote();
  }, [onClickExtractStickyNote, validate]);

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
            error={error}
            helperText={error ? "Please select at least one section" : ""}
          />
        </Box>
        <Box sx={{ width: 264 }}>
          <SelectFigJamSticky onChange={onChangeSelectStickyColor} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gap="20px" sx={{ mt: 4 }}>
        <ResetButton onClickReset={onClickReset} />
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExtractStickyNoteClick}
        >
          Extraction of sticky notes
        </Button>
      </Box>
    </Box>
  );
};
