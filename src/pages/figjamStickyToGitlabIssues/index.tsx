import { FigmaStickyToGitLabIssues } from "@features/contents/FigmaStickyToGitLabIssues";
import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function FigmaStickyToGitLabIssuesWrapper() {
  return (
    <>
      <Head>
        <title>Figjam sticky to gtilab issues</title>
        <meta
          name="description"
          content="Register issues from Figjam stickies to Gitlab."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ display: "flex", justifyContent: "center" }}>
        <FigmaStickyToGitLabIssues />
      </Box>
    </>
  );
}
