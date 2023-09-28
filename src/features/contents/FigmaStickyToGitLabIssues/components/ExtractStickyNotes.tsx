import { SelectFigJamSticky, SelectFigJamSections } from "@features/components";
import { Button, Switch, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DEFAULT_FIGMA_STICKY_COLOR, FigJamColor, Sections } from "../types";

type Props = {
  sections: Sections;
  onClickExtractStickyNote: (
    selectStickyColor: FigJamColor,
    selectSections: Sections,
    shouldAddPrefix: boolean
  ) => void;
};

export const ExtractStickyNotes: React.FC<Props> = ({
  sections,
  onClickExtractStickyNote,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [selectStickyColor, setSelectStickyColor] = useState<FigJamColor>(
    DEFAULT_FIGMA_STICKY_COLOR
  );
  const [selectSections, setSelectSections] = useState<Sections>(undefined);

  const [modeSelectSection, setModeSelectSection] = useState<boolean>(false);
  const [shouldAddPrefix, setShouldAddPrefix] = useState<boolean>(false);

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
    onClickExtractStickyNote(
      selectStickyColor,
      modeSelectSection ? selectSections : undefined,
      shouldAddPrefix
    );
  }, [
    shouldAddPrefix,
    modeSelectSection,
    onClickExtractStickyNote,
    selectSections,
    selectStickyColor,
    validate,
  ]);

  const handleModeSelectSection = useCallback(() => {
    setModeSelectSection((prev) => !prev);
    if (modeSelectSection) {
      setSelectSections(undefined);
    }
    setError(false);
  }, [modeSelectSection]);

  const handleChangeSelectStickyColor = useCallback(
    (color: FigJamColor) => {
      setSelectStickyColor(color);
    },
    [setSelectStickyColor]
  );

  const handleChangeSelectSections = useCallback(
    (sections: Sections) => {
      setSelectSections(sections);
    },
    [setSelectSections]
  );

  const handleAddPrefix = useCallback(() => {
    setShouldAddPrefix((prev) => !prev);
  }, [setShouldAddPrefix]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" gap="80px" sx={{ mt: 4 }}>
        <Box sx={{ width: 264 }}>
          <SelectFigJamSticky onChange={handleChangeSelectStickyColor} />
        </Box>

        <Box position="relative" sx={{ width: 264 }}>
          <FormControlLabel
            className="absolute -mt-12 left-0"
            control={
              <Switch
                checked={modeSelectSection}
                onChange={handleModeSelectSection}
              />
            }
            label="Using Sections as Filters"
          />
          <SelectFigJamSections
            resetSelectedItems={!modeSelectSection}
            sections={sections}
            onChange={handleChangeSelectSections}
            error={error}
            disabled={!modeSelectSection}
            helperText={error ? "Please select at least one section" : ""}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gap="20px" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExtractStickyNoteClick}
        >
          Export
        </Button>
      </Box>
      <FormControlLabel
        className="mt-4"
        control={
          <Switch checked={shouldAddPrefix} onChange={handleAddPrefix} />
        }
        label="Add # Prefix to Section for Title"
      />
    </Box>
  );
};
