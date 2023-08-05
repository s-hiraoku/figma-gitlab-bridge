import { useCallback } from "react";
import { useMutation, MUTATION_STATUS } from "@hooks/useMutation";
import { HTTP_METHODS } from "@utils/http";

type UpdateSettingsResponse = unknown; // API response type, replace `unknown` with the actual type
type UpdateSettingsData = {
  value: string;
};

export const useUpdateSettings = (settingKey: string) => {
  const { status, data, error, mutate } = useMutation<
    UpdateSettingsData,
    UpdateSettingsResponse
  >();

  const updateSetting = useCallback(
    async (value: string) => {
      await mutate(`/api/settings/${settingKey}`, HTTP_METHODS.PUT, { value });
    },
    [mutate, settingKey]
  );

  return {
    updateSetting,
    status,
    data,
    error,
    isLoading: status === MUTATION_STATUS.loading,
    isSuccess: status === MUTATION_STATUS.success,
    isError: status === MUTATION_STATUS.error,
  };
};
