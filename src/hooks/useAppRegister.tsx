import { useState } from "react";
import { IconType } from "@types";
import { AppRegisterContext } from "@stores/context/AppRegisterContext";

type UseAppRegister = {
  icons: IconType[];
  registerIcon: (icon: IconType) => void;
};

export const useAppRegister = (): UseAppRegister => {
  const [icons, setIcons] = useState<IconType[]>([]);

  const registerIcon = (icon: IconType) => {
    setIcons((prevIcons) => [...prevIcons, icon]);
  };

  return {
    icons,
    registerIcon,
  };
};
