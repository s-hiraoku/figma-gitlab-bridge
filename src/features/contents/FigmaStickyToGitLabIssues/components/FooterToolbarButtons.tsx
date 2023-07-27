import { Box, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import React from "react";

type FooterToolbarButtonsProps = {
  onClickReset(): void;
  onClickRegisterGitLabIssues(): void;
};

export const FooterToolbarButtons: React.FC<FooterToolbarButtonsProps> = ({
  onClickReset,
  onClickRegisterGitLabIssues,
}) => {
  return (
    <Box display="flex" gap="24px">
      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={onClickReset}
        color="warning"
      >
        Reset all
      </Button>
      <Button
        variant="outlined"
        startIcon={<PublishOutlinedIcon />}
        onClick={onClickRegisterGitLabIssues}
      >
        Register GitLab issues
      </Button>
    </Box>
  );
};
