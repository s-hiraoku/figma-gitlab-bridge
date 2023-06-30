import Head from "next/head";
import { Typography, Box, TextField, SxProps, Theme } from "@mui/material";
import { useSettings } from "@hooks/useSettings";
import { useEffect, useState } from "react";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { FetchError } from "@components/FetchError";
import { toast } from "react-toastify";
import { useTheme } from "@mui/system";
import { useApiClient } from "@hooks/useApiClient";

const FIELD_DEFAULT_STYLE: SxProps<Theme> = { mt: 8, width: 800 };
const FIELD_DEFAULT_TITLE_STYLE: SxProps<Theme> = {
  mt: 8,
  mr: `calc(${FIELD_DEFAULT_STYLE.width}px/2 + 200px)`,
  width: 200,
};

export default function Settings() {
  const theme = useTheme();
  const {
    data: settings,
    error,
    isValidating,
    mutate: revalidate,
  } = useSettings();
  const { apiClient } = useApiClient();

  const [figmaApiEndpoint, setFigmaApiEndpoint] = useState<string>("");
  const [figmaAccessToken, setFigmaAccessToken] = useState<string>("");
  const [gitLabApiEndpoint, setGitLabApiEndpoint] = useState<string>("");
  const [gitLabAccessToken, setGitLabAccessToken] = useState<string>("");

  useEffect(() => {
    if (settings) {
      setFigmaApiEndpoint(
        findValueInSettingsByKey(settings, SETTING_KEY.figmaAPIEndpoint) ?? ""
      );
      setFigmaAccessToken(
        findValueInSettingsByKey(settings, SETTING_KEY.figmaAccessToken) ?? ""
      );
      setGitLabApiEndpoint(
        findValueInSettingsByKey(settings, SETTING_KEY.gitLabAPIEndpoint) ?? ""
      );
      setGitLabAccessToken(
        findValueInSettingsByKey(settings, SETTING_KEY.gitLabAccessToken) ?? ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleGitLabApiEndpointChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setGitLabApiEndpoint(event.target.value);
  };

  const handleGitLabAccessTokenChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setGitLabAccessToken(event.target.value);
  };

  const handleFigmaApiEndpointBlur = () => {
    apiClient
      .put("/api/settings/figmaAPIEndpoint", { value: figmaApiEndpoint })
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.error("Failed to update Figma API endpoint:", error);
        toast.error("Failed to update Figma API endpoint");
      });
  };

  const handleFigmaAccessTokenBlur = () => {
    apiClient
      .put("/api/settings/figmaAccessToken", { value: figmaAccessToken })
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.error("Failed to update Figma access token:", error);
        toast.error("Failed to update Figma access token");
      });
  };

  const handleGitLabApiEndpointBlur = () => {
    apiClient
      .put("/api/settings/gitLabAPIEndpoint", { value: gitLabApiEndpoint })
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.error("Failed to update GitLab API endpoint:", error);
        toast.error("Failed to update GitLab API endpoint");
      });
  };

  const handleGitLabAccessTokenBlur = () => {
    apiClient
      .put("/api/settings/gitLabAccessToken", { value: gitLabAccessToken })
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.error("Failed to update GitLab access token:", error);
        toast.error("Failed to update GitLab access token");
      });
  };

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
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mt: 8 }}>
          <Typography variant="h2">⚙️ Settings</Typography>
        </Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            ...FIELD_DEFAULT_TITLE_STYLE,
            color: theme.palette.primary.main,
          }}
        >
          Figma API Settings
        </Typography>
        <Box sx={{ ...FIELD_DEFAULT_STYLE, mt: 2 }}>
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
        <Typography
          variant="h6"
          component="h2"
          sx={{
            ...FIELD_DEFAULT_TITLE_STYLE,
            color: theme.palette.primary.main,
          }}
        >
          GitLab API Settings
        </Typography>
        <Box sx={{ ...FIELD_DEFAULT_STYLE, mt: 2 }}>
          <TextField
            fullWidth
            label=" GitLab API endpoint"
            variant="filled"
            value={gitLabApiEndpoint}
            onChange={handleGitLabApiEndpointChange}
            onBlur={handleGitLabApiEndpointBlur}
          />
        </Box>
        <Box sx={FIELD_DEFAULT_STYLE}>
          <TextField
            fullWidth
            label=" GitLab access token"
            variant="filled"
            value={gitLabAccessToken}
            onChange={handleGitLabAccessTokenChange}
            onBlur={handleGitLabAccessTokenBlur}
          />
        </Box>
      </Box>
    </>
  );
}
