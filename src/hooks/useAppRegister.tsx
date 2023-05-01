import { useContext } from "react";
import { IconType } from "@types";
import { AppRegisterContext } from "@stores/context/AppRegisterContext";

type UseAppRegister = {
  icons: IconType[];
  registerIcon: (icon: IconType) => void;
};

export const useAppRegister = (): UseAppRegister => {
  const context = useContext(AppRegisterContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppRegisterProvider");
  }
  return context;
};
