import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type BackButtonProps = {
  onClickBack(): void;
};

export const BackButton: React.FC<BackButtonProps> = ({ onClickBack }) => {
  return (
    <Button
      sx={{
        position: "absolute",
        left: 20,
        top: 20,
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
