import { UseRequestSuspenseReturnType, useRequest } from "./useRequest";
import { Settings, zSettings } from "@lib/validators";

export const useSettings = (): UseRequestSuspenseReturnType<
  Settings,
  unknown
> => {
  const { data, mutate } = useRequest<Settings>(
    "/api/settings",
    {},
    {
      fallbackData: [],
      revalidateIfStale: false,
      revalidateOnMount: true,
      suspense: true,
    }
  );

  return {
    data: data ? zSettings.parse(data) : undefined,
    mutate,
  };
};
