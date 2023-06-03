import { UseRequestReturnType, useRequest } from "./useRequest";
import { Settings, zSettings } from "@lib/validators";

export const useSettings = (): UseRequestReturnType<Settings, any> => {
  const { data, error, isValidating, mutate } = useRequest<Settings>(
    "/api/settings",
    {},
    {
      fallbackData: undefined,
      revalidateIfStale: false,
    }
  );

  return {
    data: data ? zSettings.parse(data) : undefined,
    error,
    isValidating,
    mutate,
  };
};
