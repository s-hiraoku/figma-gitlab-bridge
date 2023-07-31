import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type BackButtonProps = {
  top: number;
  left: number;
  onClickBack(): void;
};

export const BackButton: React.FC<BackButtonProps> = ({
  top = 20,
  left = 20,
  onClickBack,
}) => {
  return (
    <Button
      sx={{
        position: "absolute",
        top,
        left,
        fontSize: "1rem",
      }}
      onClick={onClickBack}
      color="secondary"
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};
