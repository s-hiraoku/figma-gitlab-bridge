import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";
import { useMemo } from "react";

type UseGraphQLApiClientReturnType = {
  graphQLApiClient: GraphQLClient;
};

export const useGraphQLApiClient = (
  endpoint: string,
  requestHeaders: GraphQLClientRequestHeaders = {}
): UseGraphQLApiClientReturnType => {
  const graphQLApiClient = useMemo(
    () => new GraphQLClient(endpoint, { headers: requestHeaders }),
    [endpoint, requestHeaders]
  );

  return { graphQLApiClient };
};
