import React, { useState } from "react";
import { AppBar, Box, Toolbar, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import { useRouter } from "next/router";
import { parseCssSizeString } from "@utils/cssSize";

type IconSidebarProps = {
  icons: Array<React.ReactNode>;
  showSettingsIcon?: boolean;
  initialSelected: number;
};

export const IconSidebar: React.FC<IconSidebarProps> = ({
  icons,
  showSettingsIcon = true,
  initialSelected,
}) => {
  const [selected, setSelected] = useState(initialSelected);
  const router = useRouter();
  const theme = useTheme();

  const barTop =
    parseCssSizeString(theme.spacing(4)).value +
    parseCssSizeString(theme.spacing(5)).value * (selected || 0) +
    (selected >= 1 ? parseCssSizeString(theme.spacing(1)).value : 0);

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleIconClick = (index: number) => {
    setSelected(index);
  };

  return (
    <AppBar
      position="static"
      sx={{ width: 56, alignItems: "center", height: "100%" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            py: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: -5,
              top: barTop,
              width: 2,
              height: theme.spacing(5),
              backgroundColor: "white",
              transition: "top 300ms",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 2,
            }}
          >
            {icons.map((icon, index) => (
              <Box
                key={index}
                sx={{
                  mt: index === 0 ? 0 : 1,
                }}
                onClick={() => handleIconClick(index)}
              >
                {React.cloneElement(icon as React.ReactElement, {
                  selected: selected === index,
                })}
              </Box>
            ))}
          </Box>
          <Box>
            {showSettingsIcon && (
              <IconButtonWithTooltip
                icon={<SettingsIcon />}
                color="inherit"
                tooltipText={"settings"}
                tooltipPlacement="right"
                onClick={handleSettings}
              />
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
