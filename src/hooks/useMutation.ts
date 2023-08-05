import { AxiosError, AxiosResponse } from "axios";
import { useReducer, useCallback } from "react";
import { HTTP_METHODS } from "@utils/http";
import { useApiClient } from "@hooks/useApiClient";

export type MutationStatus = "idle" | "loading" | "success" | "error";

export const MUTATION_STATUS: Record<MutationStatus, MutationStatus> = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
} as const;

export type State<D> = {
  status: MutationStatus;
  data: D | null;
  error: AxiosError | null;
};

const initialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

type actionType = "LOADING" | "SUCCESS" | "ERROR";

const ACTION_TYPE = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

type Action<D> = {
  type: actionType;
  payload: D | AxiosError | null;
};

function reducer<D>(state: State<D>, action: Action<D>): State<D> {
  switch (action.type) {
    case ACTION_TYPE.LOADING:
      return { status: MUTATION_STATUS.loading, data: null, error: null };
    case ACTION_TYPE.SUCCESS:
      return {
        status: MUTATION_STATUS.success,
        data: action.payload as D,
        error: null,
      };
    case ACTION_TYPE.ERROR:
      return {
        status: MUTATION_STATUS.error,
        data: null,
        error: action.payload as AxiosError,
      };
    default:
      return state;
  }
}

export const useMutation = <D, R = D>() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { apiClient } = useApiClient();

  const mutate = useCallback(
    async (
      url: string,
      method: Omit<keyof typeof HTTP_METHODS, "GET">,
      data?: D
    ): Promise<AxiosResponse<R> | undefined> => {
      dispatch({ type: ACTION_TYPE.LOADING, payload: null });
      try {
        const response = await apiClient.request<R>({
          url,
          method: method as string,
          data,
        });
        dispatch({ type: ACTION_TYPE.SUCCESS, payload: response.data });
        return response;
      } catch (error) {
        dispatch({ type: ACTION_TYPE.ERROR, payload: error });
        return undefined;
      }
    },
    [apiClient]
  );

  return { ...state, mutate };
};
