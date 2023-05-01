import React, { useState } from "react";
import { IconType } from "@types";
import { AppRegisterContext } from "./AppRegisterContext";

type AppRegisterProviderProps = {
  children: React.ReactNode;
};

export const AppRegisterProvider: React.FC<AppRegisterProviderProps> = ({
  children,
}) => {
  const [icons, setIcons] = useState<IconType[]>([]);

  const registerIcon = (icon: IconType) => {
    setIcons((prevIcons) => [...prevIcons, icon]);
  };

  return (
    <AppRegisterContext.Provider value={{ icons, registerIcon }}>
      {children}
    </AppRegisterContext.Provider>
  );
};
