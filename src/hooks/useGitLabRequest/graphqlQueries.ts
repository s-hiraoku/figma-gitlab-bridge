export const GET_ISSUES_QUERY = `
  query GetIssuesWithLabels($fullPath: ID!) {
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
  mutation CreateIssueWithLabel($fullPath: ID!, $title: String!, $description: String!, $labelName: String!, $labelColor: String!) {
    createIssue(input: {projectPath: $fullPath, title: $title, description: $description}) {
      issue {
        id
        title
        description
      }
    }
    createLabel(input: {projectPath: $fullPath, title: $labelName, color: $labelColor}) {
      label {
        id
        title
        color
      }
    }
    assignLabel(input: {labelId: LabelId, issueId: IssueId}) {
      labelEdge {
        node {
          title
        }
      }
    }
  }
`;
