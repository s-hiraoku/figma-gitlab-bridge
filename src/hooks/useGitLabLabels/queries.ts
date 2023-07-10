import { gql, GraphQLClient, Variables } from "graphql-request";
import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const GET_LABELS_QUERY = gql`
  query GetLabels($fullPath: ID!) {
    project(fullPath: $fullPath) {
      labels {
        nodes {
          id
          title
          color
          description
        }
      }
    }
  }
`;

export const gitLabLabelsQueries = createQueryKeys("GitLabLabels", {
  all: (apiClient: GraphQLClient, variables: Variables) => ({
    queryKey: [{ variables }],
    queryFn: () => {
      return apiClient.request(GET_LABELS_QUERY, variables);
    },
  }),
});

export type GitLabLabelsQueries = inferQueryKeys<typeof gitLabLabelsQueries>;
