import Head from "next/head";
import { App } from "@features/App";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AppContext } from "@stores/context/AppContext";

export default function Home() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Home component must be wrapped within an AppProvider");
  }
  const { apps } = context;
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
        {apps.length > 0 && <App appId={apps[0].id} />}
      </Box>
    </>
  );
}
