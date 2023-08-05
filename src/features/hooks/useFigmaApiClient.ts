import { useHttpErrorHandler } from "@hooks/useHttpErrorHandler";
import Axios, { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";

type UseFigmaApiClientReturnType = {
  figmaApiClient: AxiosInstance;
};

export const useFigmaApiClient = (
  figmaApiEndpoint: string
): UseFigmaApiClientReturnType => {
  const { handleHttpError } = useHttpErrorHandler();

  const figmaApiClient = useMemo(() => {
    return Axios.create({
      baseURL: figmaApiEndpoint,
    });
  }, [figmaApiEndpoint]);

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
