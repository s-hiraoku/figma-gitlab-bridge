import { useMemo } from "react";
import { UseRequestSuspenseReturnType, useRequest } from "@hooks/useRequest";
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

  const parsedData = useMemo(() => {
    return data ? zSettings.parse(data) : undefined;
  }, [data]);

  return {
    data: parsedData,
    mutate,
  };
};
