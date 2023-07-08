import { AxiosError } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { RequestConfig } from "@types";
import { useApiClient } from "@hooks/useApiClient";

const REQUEST_CONFIG: RequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export type UseRequestReturnType<Data, Error> = Pick<
  SWRResponse<Data, AxiosError<Error>>,
  "isValidating" | "error" | "mutate"
> & {
  data: Data | undefined;
};

export type UseRequestSuspenseReturnType<Data, Error> = Pick<
  SWRResponse<Data, AxiosError<Error>>,
  "mutate"
> & {
  data: Data | undefined;
};

type UseRequestSWRConfig<Data = unknown, Error = unknown> = Pick<
  SWRConfiguration<Data, AxiosError<Error>>,
  "revalidateIfStale" | "suspense" | "revalidateOnMount"
> & {
  fallbackData?: Data;
};

const baseConfig: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

function createConfig(
  customConfig: Partial<SWRConfiguration> = {}
): SWRConfiguration {
  return { ...baseConfig, ...customConfig };
}

export function useRequest<Data = unknown, Error = unknown>(
  url: string | null,
  requestConfig: RequestConfig = {},
  { fallbackData, ...config }: UseRequestSWRConfig<Data, Error> = {}
): UseRequestReturnType<Data, Error> {
  const { apiClient } = useApiClient();
  const fetcher = async (url: string): Promise<Data> => {
    const res = await apiClient.get(url, {
      ...REQUEST_CONFIG,
      ...requestConfig,
    });
    return res.data;
  };

  const finalConfig = createConfig({
    ...config,
    fallbackData,
  });

  const { data, error, isValidating, mutate } = useSWR<
    Data,
    AxiosError<Error>,
    string | null
  >(url, fetcher, finalConfig);

  return {
    data,
    error,
    isValidating,
    mutate,
  };
}
