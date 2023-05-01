import Head from "next/head";
import { Typography, Box } from "@mui/material";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - Figma GitLab Bridge</title>
        <meta
          name="description"
          content="Settings for the Figma GitLab Bridge application."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h2">Settings</Typography>
          {/* Settings content goes here */}
        </Box>
      </Box>
    </>
  );
}
