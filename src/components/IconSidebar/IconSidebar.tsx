import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import { useRouter } from "next/router";

type IconSidebarProps = {
  icons: Array<React.ReactNode>;
  showSettingsIcon?: boolean;
};

export const IconSidebar: React.FC<IconSidebarProps> = ({
  icons,
  showSettingsIcon = true, // TODO: componentsとしては具象化しているので、抽象化改善予定(トップダウンとボトムアップもみたいな)
}) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const router = useRouter();
  const handleSettings = () => {
    router.push("/settings");
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
          }}
        >
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
              >
                {icon}
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
