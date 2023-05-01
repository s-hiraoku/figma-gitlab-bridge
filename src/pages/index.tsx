import Head from "next/head";

import { App } from "@features/App";
import Box from "@mui/material/Box";

export default function Home() {
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
        <App />
      </Box>
    </>
  );
}
