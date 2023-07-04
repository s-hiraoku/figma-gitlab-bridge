import { useHttpErrorHandler } from "@hooks/useHttpErrorHandler";
import Axios, { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";
import { useFigmaSettings } from "./useFigmaSettings";

type UseFigmaApiClientReturnType = {
  figmaApiClient: AxiosInstance;
};

export const useFigmaApiClient = (): UseFigmaApiClientReturnType => {
  const { getFigmaAPIEndpoint } = useFigmaSettings();

  const { handleHttpError } = useHttpErrorHandler();

  const figmaAPIEndpoint = getFigmaAPIEndpoint();
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
