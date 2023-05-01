import React from "react";
import { IconType } from "@types";

type AppRegisterContextType = {
  icons: IconType[];
  registerIcon: (icon: IconType) => void;
};

export const AppRegisterContext = React.createContext<
  AppRegisterContextType | undefined
>(undefined);
