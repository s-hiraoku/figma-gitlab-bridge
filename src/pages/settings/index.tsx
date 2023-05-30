import Head from "next/head";
import { Typography, Box, TextField, SxProps, Theme } from "@mui/material";
import { useSettings } from "@hooks/useSettings";
import { useEffect, useState } from "react";
import { SETTING_KEY, findValueInSettingsByKey } from "./models";
import { Loading } from "@components/Loading";
import { FetchError } from "@components/FetchError";

const FIELD_DEFAULT_STYLE: SxProps<Theme> = { mt: 8, width: 800 };

export default function Settings() {
  const { settings, error, isValidating, revalidate } = useSettings();

  const [figmaApiEndpoint, setFigmaApiEndpoint] = useState<string>("");
  const [figmaAccessToken, setFigmaAccessToken] = useState<string>("");

  useEffect(() => {
    if (settings) {
      setFigmaApiEndpoint(
        findValueInSettingsByKey(settings, SETTING_KEY.figmaAPIEndpoint) ?? ""
      );
      setFigmaAccessToken(
        findValueInSettingsByKey(settings, SETTING_KEY.figmaAccessToken) ?? ""
      );
    }
  }, [isValidating]);

  const handleFigmaApiEndpointChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setFigmaApiEndpoint(event.target.value);
  };

  const handleFigmaAccessTokenChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setFigmaAccessToken(event.target.value);
  };

  const handleFigmaApiEndpointBlur = () => {
    // TODO: Save to database
    revalidate();
  };

  const handleFigmaAccessTokenBlur = () => {
    // TODO: Save to database
    revalidate();
  };

  if (isValidating) {
    return <Loading />;
  }

  if (error) {
    return <FetchError />;
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mt: 8 }}>
          <Typography variant="h2">⚙️ Settings</Typography>
        </Box>
        <Box sx={FIELD_DEFAULT_STYLE}>
          <TextField
            fullWidth
            label=" Figma API endpoint"
            variant="filled"
            value={figmaApiEndpoint}
            onChange={handleFigmaApiEndpointChange}
            onBlur={handleFigmaApiEndpointBlur}
          />
        </Box>
        <Box sx={FIELD_DEFAULT_STYLE}>
          <TextField
            fullWidth
            label=" Figma access token"
            variant="filled"
            value={figmaAccessToken}
            onChange={handleFigmaAccessTokenChange}
            onBlur={handleFigmaAccessTokenBlur}
          />
        </Box>
      </Box>
    </>
  );
}
