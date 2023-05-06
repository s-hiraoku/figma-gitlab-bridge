import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "@stores/context/AppContext";
import { blue, red } from "@mui/material/colors";
import { AppContent } from "./_components";

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
      <AppProvider>
        <AppContent Component={Component} {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
}
