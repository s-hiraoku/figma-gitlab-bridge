import { AxiosError } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { apiClient, RequestConfig } from "@services/api";

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

type UseRequestSWRConfig<Data = unknown, Error = unknown> = Pick<
  SWRConfiguration<Data, AxiosError<Error>>,
  "revalidateIfStale"
> & {
  fallbackData?: Data;
};

const baseConfig: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

const fetcher =
  (requestConfig: RequestConfig) =>
  async <Data>(url: string): Promise<Data> => {
    const res = await apiClient(url, {
      ...REQUEST_CONFIG,
      ...requestConfig,
    });
    return res.data;
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
  const finalConfig = createConfig({
    ...config,
    fallbackData,
  });
  const { data, error, isValidating, mutate } = useSWR<
    Data,
    AxiosError<Error>,
    string | null
  >(url, fetcher(requestConfig), finalConfig);

  return {
    data,
    error,
    isValidating,
    mutate,
  };
}
