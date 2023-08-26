import Head from "next/head";
import {
  Typography,
  Box,
  TextField,
  SxProps,
  Theme,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FetchError } from "@components/FetchError";
import { toast } from "react-toastify";
import { useTheme } from "@mui/system";
import { useBoolean } from "@hooks/useBoolean";
import { FIllED_INPUT_TYPE } from "@utils/ui";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";

import { Loading } from "@components/Loading";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { useFigmaSettings } from "@features/hooks/useFigmaSettings";
import { useGitLabSettings } from "@features/hooks/useGitLabSettings";
import { BackButton } from "@components/BackButton";
import { useUpdateSettings } from "@features/hooks/useUpdateSettings";
import { SETTING_KEY } from "@features/settings";

const FIELD_DEFAULT_STYLE: SxProps<Theme> = { mt: 8, width: 800 };
const FIELD_DEFAULT_TITLE_STYLE: SxProps<Theme> = {
  mt: 8,
  mr: `calc(${FIELD_DEFAULT_STYLE.width}px/2 + 200px)`,
  width: 200,
};

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const { getFigmaAccessToken, getFigmaApiEndpoint, getFigmaUrl } =
    useFigmaSettings();
  const { getGitLabApiEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const [figmaApiEndpoint, setFigmaApiEndpoint] = useState<string>("");
  const [figmaAccessToken, setFigmaAccessToken] = useState<string>("");
  const [figmaUrl, setFigmaUrl] = useState<string>("");
  const [gitLabProjectPath, setGitLabProjectPath] = useState<string>("");
  const [gitLabApiEndpoint, setGitLabApiEndpoint] = useState<string>("");
  const [gitLabAccessToken, setGitLabAccessToken] = useState<string>("");

  const { value: showFigmaAccessToken, toggle: toggleShowFigmaAccessToken } =
    useBoolean(false);
  const { value: showGitLabAccessToken, toggle: toggleShowGitLabAccessToken } =
    useBoolean(false);

  const {
    updateSetting: updateFigmaApiEndpoint,
    isLoading: isUpdatingFigmaApiEndpoint,
  } = useUpdateSettings(SETTING_KEY.figmaApiEndpoint);

  const {
    updateSetting: updateFigmaAccessToken,
    isLoading: isUpdatingFigmaAccessToken,
  } = useUpdateSettings(SETTING_KEY.figmaAccessToken);

  const { updateSetting: updatefigmaUrl, isLoading: isUpdatingfigmaUrl } =
    useUpdateSettings(SETTING_KEY.figmaUrl);

  const {
    updateSetting: updateGitLabProjectPath,
    isLoading: isUpdatingGitLabProjectPath,
  } = useUpdateSettings(SETTING_KEY.gitLabProjectPath);

  const {
    updateSetting: updateGitLabApiEndpoint,
    isLoading: isUpdatingGitLabApiEndpoint,
  } = useUpdateSettings(SETTING_KEY.gitLabApiEndpoint);

  const {
    updateSetting: updateGitLabAccessToken,
    isLoading: isUpdatingGitLabAccessToken,
  } = useUpdateSettings(SETTING_KEY.gitLabAccessToken);

  useEffect(() => {
    setFigmaApiEndpoint(getFigmaApiEndpoint() ?? "");
    setFigmaAccessToken(getFigmaAccessToken() ?? "");
    setFigmaUrl(getFigmaUrl() ?? "");
    setGitLabProjectPath(getGitLabProjectPath() ?? "");
    setGitLabApiEndpoint(getGitLabApiEndpoint() ?? "");
    setGitLabAccessToken(getGitLabAccessToken() ?? "");
  }, [
    getFigmaApiEndpoint,
    getFigmaAccessToken,
    getFigmaUrl,
    getGitLabProjectPath,
    getGitLabApiEndpoint,
    getGitLabAccessToken,
  ]);

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

  const handleFigmaUrlChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFigmaUrl(event.target.value);
  };

  const handleGitLabProjectPathChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setGitLabProjectPath(event.target.value);
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

  const handleFigmaApiEndpointBlur = useCallback(() => {
    if (isUpdatingFigmaApiEndpoint) return;
    updateFigmaApiEndpoint(figmaApiEndpoint).catch((error) => {
      console.error("Failed to update Figma API endpoint:", error);
      toast.error("Failed to update Figma API endpoint");
    });
  }, [updateFigmaApiEndpoint, figmaApiEndpoint, isUpdatingFigmaApiEndpoint]);

  const handleFigmaAccessTokenBlur = useCallback(() => {
    if (isUpdatingFigmaAccessToken) return;
    updateFigmaAccessToken(figmaAccessToken).catch((error) => {
      console.error("Failed to update Figma access token:", error);
      toast.error("Failed to update Figma access token");
    });
  }, [figmaAccessToken, isUpdatingFigmaAccessToken, updateFigmaAccessToken]);

  const handleFigmaUrlBlur = useCallback(() => {
    if (isUpdatingfigmaUrl) return;
    updatefigmaUrl(figmaUrl).catch((error) => {
      console.error("Failed to update Figma URL:", error);
      toast.error("Failed to update Figma URL");
    });
  }, [figmaUrl, isUpdatingfigmaUrl, updatefigmaUrl]);

  const handleGitLabProjectPathBlur = useCallback(() => {
    if (isUpdatingGitLabProjectPath) return;
    updateGitLabProjectPath(gitLabProjectPath).catch((error) => {
      console.error("Failed to update GitLab project path:", error);
      toast.error("Failed to update GitLab project path");
    });
  }, [gitLabProjectPath, isUpdatingGitLabProjectPath, updateGitLabProjectPath]);

  const handleGitLabApiEndpointBlur = useCallback(() => {
    if (isUpdatingGitLabApiEndpoint) return;
    updateGitLabApiEndpoint(gitLabApiEndpoint).catch((error) => {
      console.error("Failed to update GitLab API endpoint:", error);
      toast.error("Failed to update GitLab API endpoint");
    });
  }, [gitLabApiEndpoint, isUpdatingGitLabApiEndpoint, updateGitLabApiEndpoint]);

  const handleGitLabAccessTokenBlur = useCallback(() => {
    if (isUpdatingGitLabAccessToken) return;
    updateGitLabAccessToken(gitLabAccessToken).catch((error) => {
      console.error("Failed to update GitLab access token:", error);
      toast.error("Failed to update GitLab access token");
    });
  }, [gitLabAccessToken, isUpdatingGitLabAccessToken, updateGitLabAccessToken]);

  const handleClickShowFigmaAccessTokenPassword = useCallback(() => {
    toggleShowFigmaAccessToken();
  }, [toggleShowFigmaAccessToken]);

  const handleMouseDownFigmaAccessTokenPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowGitLabAccessTokenPassword = useCallback(() => {
    toggleShowGitLabAccessToken();
  }, [toggleShowGitLabAccessToken]);

  const handleMouseDownGitLabAccessTokenPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleGoBack = () => {
    router.back();
  };

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
      <Box>
        <BackButton onClickBack={handleGoBack} />
      </Box>
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
        <ErrorBoundary
          fallback={
            <div className="mt-8">
              <FetchError />
            </div>
          }
        >
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
          <Suspense fallback={<Loading />}>
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
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="figma-access-token-password">
                  Figma access token
                </InputLabel>
                <FilledInput
                  id="figma-access-token-password"
                  fullWidth
                  type={
                    showFigmaAccessToken
                      ? FIllED_INPUT_TYPE.text
                      : FIllED_INPUT_TYPE.password
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowFigmaAccessTokenPassword}
                        onMouseDown={handleMouseDownFigmaAccessTokenPassword}
                        edge="end"
                      >
                        {showFigmaAccessToken ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={figmaAccessToken}
                  onChange={handleFigmaAccessTokenChange}
                  onBlur={handleFigmaAccessTokenBlur}
                />
              </FormControl>
            </Box>
            <Box sx={FIELD_DEFAULT_STYLE}>
              <TextField
                fullWidth
                label=" Figma URL"
                variant="filled"
                value={figmaUrl}
                onChange={handleFigmaUrlChange}
                onBlur={handleFigmaUrlBlur}
              />
            </Box>
          </Suspense>
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
          <Suspense fallback={<Loading />}>
            <Box sx={{ ...FIELD_DEFAULT_STYLE, mt: 2 }}>
              <TextField
                fullWidth
                label=" GitLab Project Path"
                variant="filled"
                value={gitLabProjectPath}
                onChange={handleGitLabProjectPathChange}
                onBlur={handleGitLabProjectPathBlur}
              />
            </Box>
            <Box sx={FIELD_DEFAULT_STYLE}>
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
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="gitlab-access-token-password">
                  GitLab access token
                </InputLabel>
                <FilledInput
                  id="gitlab-access-token-password"
                  fullWidth
                  type={
                    showGitLabAccessToken
                      ? FIllED_INPUT_TYPE.text
                      : FIllED_INPUT_TYPE.password
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowGitLabAccessTokenPassword}
                        onMouseDown={handleMouseDownGitLabAccessTokenPassword}
                        edge="end"
                      >
                        {showGitLabAccessToken ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={gitLabAccessToken}
                  onChange={handleGitLabAccessTokenChange}
                  onBlur={handleGitLabAccessTokenBlur}
                />
              </FormControl>
            </Box>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </>
  );
}
