import React from "react";
import { AppType } from "@types";

type AppContextType = {
  apps: AppType[];
  registerApp: (app: AppType) => void;
  unregisterApp: (appId: string) => void;
  selectedAppId: string | null;
  setSelectedAppId: (appId: string) => void;
};

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);
