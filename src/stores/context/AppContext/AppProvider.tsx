import React, { useCallback, useState } from "react";
import { AppType } from "@types";
import { AppContext } from "./AppContext";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apps, setApps] = useState<AppType[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const registerApp = useCallback(
    (app: AppType) => {
      setApps((prevApps) => [...prevApps, app]);
    },
    [setApps]
  );
  const unregisterApp = useCallback(
    (appId: string) => {
      setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
    },
    [setApps]
  );

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
