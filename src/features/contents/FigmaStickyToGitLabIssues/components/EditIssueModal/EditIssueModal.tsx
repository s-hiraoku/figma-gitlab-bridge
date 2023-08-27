import React, { useCallback, useEffect, useState } from "react";
import { GitLabIssue } from "../../utils";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  issue: GitLabIssue;
  onChangeIssue: (issue: GitLabIssue) => void;
  onClose: () => void;
};

export const EditIssueModal: React.FC<Props> = ({
  open,
  issue: initialIssue,
  onChangeIssue,
  onClose,
}) => {
  const [issue, setIssue] = useState<GitLabIssue>(initialIssue);

  useEffect(() => {
    if (open) {
      setIssue(initialIssue);
    }
  }, [initialIssue, open]);

  const handleSave = useCallback(() => {
    onChangeIssue(issue);
    onClose();
  }, [issue, onChangeIssue, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Issue</DialogTitle>
      <DialogContent>
        <DialogContentText color="secondary">
          You can edit the title and description.
        </DialogContentText>
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="title"
            variant="filled"
            value={issue.title}
            onChange={(e) => setIssue({ ...issue, title: e.target.value })}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="description"
            variant="filled"
            value={issue.description}
            onChange={(e) =>
              setIssue({ ...issue, description: e.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
