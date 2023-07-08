import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";
import { useMemo } from "react";
import { useDeepCompareMemo } from "./useDeepCompareMemo";

type UseGraphQLApiClientReturnType = {
  graphQLApiClient: GraphQLClient;
};

export const useGraphQLApiClient = (
  endpoint: string,
  requestHeaders: GraphQLClientRequestHeaders = {}
): UseGraphQLApiClientReturnType => {
  const memoizedHeaders = useDeepCompareMemo(requestHeaders);

  const graphQLApiClient = useMemo(() => {
    return new GraphQLClient(endpoint, { headers: memoizedHeaders });
  }, [endpoint, memoizedHeaders]);

  return { graphQLApiClient };
};
