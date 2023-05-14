import React, { useContext } from "react";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import { AppContext } from "@stores/context/AppContext/AppContext";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import { HOME_APP_ID } from "./Home";

export const HomeIconButton: React.FC = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppProvider");
  }
  const { setSelectedAppId } = context;
  const handleClick = () => {
    router.push("/");
    setSelectedAppId(HOME_APP_ID);
  };

  return (
    <IconButtonWithTooltip
      icon={<HomeIcon />}
      tooltipText="Home"
      tooltipPlacement="right"
      key="home"
      onClick={handleClick}
      selected={context.selectedAppId === HOME_APP_ID}
    />
  );
};
