import { useContext } from "react";
import { AppType } from "@types";
import { AppContext } from "@stores/context/AppContext";

type UseAppRegister = {
  apps: AppType[];
  registerApp: (app: AppType) => void;
  unregisterApp: (appId: string) => void;
  selectedAppId: string | null;
  setSelectedAppId: (appId: string) => void;
};

export const useAppRegister = (): UseAppRegister => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppProvider");
  }
  return context;
};
