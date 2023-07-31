import { IconSidebar } from "@components/IconSidebar";
import React, { useContext } from "react";
import { AppContext } from "@stores/context/AppContext/AppContext";
import { useRouter } from "next/router";

export const IconSidebarContainer: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppProvider");
  }
  const router = useRouter();
  const { apps } = context;
  const index = apps.findIndex((app) => app.path === router.pathname);
  if (index === -1) {
    return null;
  }

  return (
    <IconSidebar icons={apps.map((app) => app.icon)} initialSelected={index} />
  );
};
