import { API_URL } from "@config";
import { useHttpErrorHandler } from "@hooks/useHttpErrorHandler";
import Axios, { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";

type UseApiClientReturnType = {
  apiClient: AxiosInstance;
};

export const useApiClient = (): UseApiClientReturnType => {
  const { handleHttpError } = useHttpErrorHandler();
  const apiClient = useMemo(
    () =>
      Axios.create({
        baseURL: API_URL,
      }),
    []
  );

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        handleHttpError(error);
        return Promise.reject(error.response?.data);
      }
    );
    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [apiClient, handleHttpError]);

  return { apiClient };
};
