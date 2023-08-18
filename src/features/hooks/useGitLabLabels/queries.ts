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
          createdAt
        }
      }
    }
  }
`;

export const GET_GROUP_LABELS_QUERY = gql`
  query GetGroupLabels($fullPath: ID!) {
    group(fullPath: $fullPath) {
      labels {
        nodes {
          id
          title
          color
          description
          createdAt
        }
      }
    }
  }
`;

export const gitLabLabelsQueries = createQueryKeys("GitLabLabels", {
  list: (apiClient: GraphQLClient, variables: Variables) => ({
    queryKey: [{ variables }],
    queryFn: () => {
      return apiClient.request(GET_LABELS_QUERY, variables);
    },
  }),
});

export const gitLabGroupLabelsQueries = createQueryKeys("GitLabLabels", {
  list: (apiClient: GraphQLClient, variables: Variables) => ({
    queryKey: [{ variables }],
    queryFn: () => {
      return apiClient.request(GET_GROUP_LABELS_QUERY, variables);
    },
  }),
});

export type GitLabLabelsQueries = inferQueryKeys<typeof gitLabLabelsQueries>;
export type GitLabGroupLabelsQueries = inferQueryKeys<
  typeof gitLabGroupLabelsQueries
>;
