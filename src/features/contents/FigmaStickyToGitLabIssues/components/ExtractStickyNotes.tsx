import { SelectFigJamSticky, SelectFigJamSections } from "@features/components";
import { Button, Switch, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FigJamColor } from "../types";
import { ResetButton } from "./ResetButton";

type Props = {
  sections: string[] | undefined;
  selectSections: string[] | undefined;
  onChangeSelectStickyColor: (color: FigJamColor) => void;
  onClickExtractStickyNote: () => void;
  onClickReset: () => void;
  onChangeSelectSections(sections: string[] | undefined): void;
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
  const [modeSelectSection, setModeSelectSection] = useState<boolean>(false);

  const validate = useCallback(() => {
    if (
      modeSelectSection === true &&
      (selectSections === undefined || selectSections.length === 0)
    ) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  }, [modeSelectSection, selectSections]);

  const handleExtractStickyNoteClick = useCallback(() => {
    if (!validate()) {
      return;
    }
    onClickExtractStickyNote();
  }, [onClickExtractStickyNote, validate]);

  const handleModeSelectSection = useCallback(() => {
    setModeSelectSection((prev) => !prev);
    setError(false);
    onChangeSelectSections(undefined);
  }, [onChangeSelectSections]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        gap="80px"
        position="relative"
        sx={{ mt: 4 }}
      >
        <FormControlLabel
          className="absolute -mt-12 left-0"
          control={
            <Switch
              checked={modeSelectSection}
              onChange={handleModeSelectSection}
            />
          }
          label="Select Section"
        />
        <Box sx={{ width: 264 }}>
          <SelectFigJamSections
            sections={sections}
            onChange={onChangeSelectSections}
            error={error}
            disabled={!modeSelectSection}
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
