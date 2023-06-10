import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { useHttpErrorHandler } from "@hooks/useHttpErrorHandler";
import { useSettings } from "@hooks/useSettings";

import Axios, { AxiosInstance } from "axios";

import { useEffect, useMemo } from "react";

type UseFigmaApiClientReturnType = {
  figmaApiClient: AxiosInstance;
};

export const useFigmaApiClient = (): UseFigmaApiClientReturnType => {
  const { data: settings } = useSettings();
  const { handleHttpError } = useHttpErrorHandler();

  const figmaAPIEndpoint = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return findValueInSettingsByKey(
      adjustedSettings,
      SETTING_KEY.figmaAPIEndpoint
    );
  }, [settings]);
  const figmaApiClient = useMemo(() => {
    return Axios.create({
      baseURL: figmaAPIEndpoint ?? "",
    });
  }, [figmaAPIEndpoint]);

  useEffect(() => {
    const interceptor = figmaApiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        handleHttpError(error);
        return Promise.reject(error.response?.data);
      }
    );
    return () => {
      figmaApiClient.interceptors.response.eject(interceptor);
    };
  }, [figmaApiClient, handleHttpError]);

  return { figmaApiClient };
};
