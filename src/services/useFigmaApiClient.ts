import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { useSettings } from "@hooks/useSettings";
import Axios, { AxiosInstance } from "axios";

type UseFigmaApiClientReturnType = {
  figmaApiClient: AxiosInstance;
};

export const useFigmaApiClient = (): UseFigmaApiClientReturnType => {
  const { data: settings } = useSettings();
  const adjustedSettings = settings ?? [];

  const figmaAPIEndpoint = findValueInSettingsByKey(
    adjustedSettings,
    SETTING_KEY.figmaAPIEndpoint
  );
  const figmaApiClient = Axios.create({ baseURL: figmaAPIEndpoint ?? "" });
  return { figmaApiClient };
};
