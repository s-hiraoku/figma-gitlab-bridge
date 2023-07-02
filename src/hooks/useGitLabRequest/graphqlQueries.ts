export const GET_ISSUES_QUERY = `
  query GetIssues($fullPath: ID!) {
    project(fullPath: $fullPath) {
      issues {
        nodes {
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
  }
`;

export const CREATE_ISSUE_MUTATION = `
mutation CreateIssue($projectPath: ID!, $title: String!, $description: String!, $labels: [String!]) {
  createIssue(input: {projectPath: $projectPath, title: $title, description: $description, labels: $labels}) {
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
