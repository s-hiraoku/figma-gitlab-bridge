import Head from "next/head";
import { App } from "@features/App";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AppContext } from "@stores/context/AppContext";
import { FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID } from "@features/contents/FigmaStickyToGitLabIssues";

export default function Home() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Home component must be wrapped within an AppProvider");
  }
  const { selectedAppId } = context;
  return (
    <>
      <Head>
        <title>Figma GitLab Bridge</title>
        <meta
          name="description"
          content="An application that links Figma and GitLab."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ display: "flex", justifyContent: "center" }}>
        <App appId={selectedAppId ?? FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID} />
      </Box>
    </>
  );
}
