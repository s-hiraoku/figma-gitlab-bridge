import useSWR, { KeyedMutator } from "swr";
import axios, { AxiosResponse } from "axios";
import { Settings, zSettings } from "@lib/validators";

type FetchResponse = Settings;
type Error = any;

const fetcher = (url: string): Promise<FetchResponse> =>
  axios
    .get<FetchResponse>(url)
    .then((res: AxiosResponse<FetchResponse>) => res.data);

export type UseSettingsResponse = {
  settings: Settings | undefined;
  error: Error | undefined;
  isValidating: boolean;
  revalidate: KeyedMutator<Settings>;
};

export const useSettings = (): UseSettingsResponse => {
  const { data, error, mutate } = useSWR<FetchResponse, Error>(
    "/api/settings",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    settings: data ? zSettings.parse(data) : undefined,
    error,
    isValidating: !error && !data,
    revalidate: mutate,
  };
};
