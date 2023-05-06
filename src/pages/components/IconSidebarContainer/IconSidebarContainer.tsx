import { IconSidebar } from "@components/IconSidebar";
import React, { useContext } from "react";
import { AppContext } from "@stores/context/AppContext/AppContext";

export const IconSidebarContainer: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppProvider");
  }
  const { apps } = context;

  return <IconSidebar icons={apps.map((app) => app.icon)} />;
};
