import { useEffect, useState, useMemo, useCallback } from "react";
import { GraphQLClient } from "graphql-request";

type GraphQLClientHook<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: (query?: string) => Promise<void>;
  mutate: (
    mutation: string,
    variables?: Record<string, unknown>
  ) => Promise<void>;
};

export const useGraphQLClient = <T>(
  endpoint: string,
  defaultQuery: string,
  token: string
): GraphQLClientHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const client = useMemo(
    () =>
      new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    [endpoint, token]
  );

  const executeGraphQLRequest = useCallback(
    async (query: string, variables?: Record<string, unknown>) => {
      setIsLoading(true);
      try {
        const result = await client.request(query, variables);
        setData(result as T);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const fetchGraphQLData = useCallback(
    async (query = defaultQuery) => {
      await executeGraphQLRequest(query);
    },
    [defaultQuery, executeGraphQLRequest]
  );

  const mutateGraphQLData = useCallback(
    async (mutation: string, variables?: Record<string, unknown>) => {
      await executeGraphQLRequest(mutation, variables);
    },
    [executeGraphQLRequest]
  );

  useEffect(() => {
    fetchGraphQLData();
  }, [fetchGraphQLData]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchGraphQLData,
    mutate: mutateGraphQLData,
  };
};
