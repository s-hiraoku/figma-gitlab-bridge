import { Box, Typography } from "@mui/material";
import { BackButton } from "@pages/_components/BackButton";
import React from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      <Box>
        <BackButton onClickBack={handleGoBack} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box>
          <Typography variant="h3">
            🏖 404 Error: The requested page cannot be found.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
