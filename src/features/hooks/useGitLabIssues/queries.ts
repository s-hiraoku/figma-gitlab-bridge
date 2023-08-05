import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { gql, GraphQLClient, Variables } from "graphql-request";

export const GET_ISSUES_QUERY = gql`
  query GetIssues($fullPath: ID!) {
    project(fullPath: $fullPath) {
      issues {
        nodes {
          id
          title
          description
          createdAt
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
    }
  }
`;

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue(
    $projectPath: ID!
    $title: String!
    $description: String!
    $labels: [String!]
  ) {
    createIssue(
      input: {
        projectPath: $projectPath
        title: $title
        description: $description
        labels: $labels
      }
    ) {
      issue {
        id
        title
        description
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
  }
`;

export const gitLabIssuesQueries = createQueryKeys("GitLabIssues", {
  list: (apiClient: GraphQLClient, variables: Variables) => ({
    queryKey: [{ variables }],
    queryFn: () => {
      return apiClient.request(GET_ISSUES_QUERY, variables);
    },
  }),
});

export type GitLabIssuesQueries = inferQueryKeys<typeof gitLabIssuesQueries>;
