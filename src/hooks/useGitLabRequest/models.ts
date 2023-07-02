// Define the type for the label
export type Label = {
  id: string;
  title: string;
  color: string;
  description?: string;
};

// Define the type for the issue
export type Issue = {
  title: string;
  description: string;
  labels: Label[];
  createdAt: string;
};

// Define the type for the project
export type Project = {
  issues: {
    nodes: Issue[];
  };
};

// Define the type for the data
export type Data = {
  project: Project;
};
