export const GET_LABELS_QUERY = `
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
