import { useState, useMemo, useCallback } from "react";
import { GraphQLClient, ClientError } from "graphql-request";

type GraphQLClientHook<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  fetch: () => Promise<void>;
  mutate: (
    mutation: string,
    variables?: Record<string, unknown>
  ) => Promise<void>;
};

export const useGraphQLClient = <T>(
  endpoint: string,
  defaultQuery: string,
  defaultVariables: Record<string, unknown> = {},
  requestHeaders: Record<string, string> = {}
): GraphQLClientHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const client = useMemo(
    () =>
      new GraphQLClient(endpoint, {
        headers: requestHeaders,
      }),
    [endpoint, requestHeaders]
  );

  const executeRequest = useCallback(
    async (query: string, variables: Record<string, unknown> = {}) => {
      setIsLoading(true);
      try {
        const result = await client.request(query, variables);
        setData(result as T);
        setError(null);
      } catch (err) {
        setError(
          err instanceof ClientError ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const fetch = useCallback(
    () => executeRequest(defaultQuery, defaultVariables),
    [defaultQuery, defaultVariables, executeRequest]
  );

  const mutate = useCallback(
    (mutation: string, variables?: Record<string, unknown>) =>
      executeRequest(mutation, variables),
    [executeRequest]
  );

  return { data, error, isLoading, fetch, mutate };
};
