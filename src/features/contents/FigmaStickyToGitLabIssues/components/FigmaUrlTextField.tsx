import { TextField } from "@mui/material";
import React, { useCallback } from "react";
import { parseFigmaId } from "../utils";

type Props = {
  figmaUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
};

const ERROR_MESSAGE = "Figma URL is invalid";

export const FigmaUrlTextField: React.FC<Props> = ({
  figmaUrl,
  onChange,
  onBlur,
  onPaste,
}) => {
  const [error, setError] = React.useState(false);
  const handleFigmaUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      if (
        parseFigmaId(event.target.value) == null &&
        event.target.value !== ""
      ) {
        setError(true);
        return;
      }
      setError(false);
    },
    [onChange]
  );
  return (
    <TextField
      error={error}
      fullWidth
      label="Figma URL"
      variant="filled"
      value={figmaUrl}
      onChange={handleFigmaUrlChange}
      onBlur={onBlur}
      onPaste={onPaste}
      helperText={error ? ERROR_MESSAGE : null}
    />
  );
};
