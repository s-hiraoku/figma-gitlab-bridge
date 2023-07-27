import ErrorOutlineSharpIcon from "@mui/icons-material/ErrorOutlineSharp";
import { Box } from "@mui/system";

export const ErrorFallback: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", color: "error.main" }}>
      <ErrorOutlineSharpIcon />
      <Box sx={{ ml: 1 }}>Error: Something went wrong</Box>
    </Box>
  );
};
