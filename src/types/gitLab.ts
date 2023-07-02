export type Label = {
  id: string;
  title: string;
  color: string;
  description?: string;
};

export type Issue = {
  title: string;
  description: string;
  labels: Label[];
  createdAt: string;
};

export type IssuesProject = {
  issues: {
    nodes: Issue[];
  };
};

export type LabelsProject = {
  labels: {
    nodes: Label[];
  };
};

export type IssueData = {
  project: IssuesProject;
};

export type LabelData = {
  project: LabelsProject;
};
