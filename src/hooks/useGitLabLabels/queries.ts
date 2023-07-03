import { gql } from "graphql-request";

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
