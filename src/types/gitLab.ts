export type Label = {
  id?: string;
  title: string;
  color?: string;
  description?: string;
  createdAt?: string;
};

export type Issue = {
  title: string;
  description: string;
  labels: LabelNodes;
  createdAt?: string;
};

export type IssueNodes = {
  nodes: Issue[];
};

export type IssuesProject = {
  issues: IssueNodes;
};

export type LabelNodes = {
  nodes: Label[];
};

export type LabelsProject = {
  labels: LabelNodes;
};

export type IssueData = {
  project: IssuesProject;
};

export type ProjectLabelData = {
  project: GroupLabelData;
};

export type GroupLabelData = {
  group: LabelsProject;
};
