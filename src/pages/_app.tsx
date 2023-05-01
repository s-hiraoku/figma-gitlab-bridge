import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, CssBaseline } from "@mui/material";
import { IconSidebarContainer } from "./components/IconSidebarContainer";
import { blue, red } from "@mui/material/colors";

export default function App({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...(isDarkMode
        ? {}
        : {
            primary: red,
            secondary: blue,
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        display="flex"
        justifyContent="left"
        height="100vh"
        width="100%"
        overflow="hidden"
      >
        <Box component="nav">
          <IconSidebarContainer />
        </Box>
        <Box
          component="main"
          flexGrow={1}
          height="100%"
          sx={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
