import React, { useState } from "react";
import { AppType } from "@types";
import { AppContext } from "./AppContext";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apps, setApps] = useState<AppType[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const registerApp = (app: AppType) => {
    setApps((prevApps) => [...prevApps, app]);
  };
  const unregisterApp = (appId: string) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        registerApp,
        unregisterApp,
        selectedAppId,
        setSelectedAppId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
