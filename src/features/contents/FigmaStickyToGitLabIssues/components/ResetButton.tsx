import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type ResetButtonProps = {
  onClickReset(): void;
};

export const ResetButton: React.FC<ResetButtonProps> = ({ onClickReset }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<RestartAltIcon />}
      onClick={onClickReset}
      color="warning"
    >
      Reset
    </Button>
  );
};
