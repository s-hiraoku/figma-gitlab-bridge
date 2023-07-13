// GitLab の issues を取得して表示するサンプルコンポーネント

import React from "react";

import { useGitLabLabels } from "@hooks/useGitLabLabels";
import { GitLab } from "@types";

export const GitLabLabels = () => {
  const { data } = useGitLabLabels();

  return (
    <div>
      {data &&
        data.project &&
        data.project.labels.nodes.map((label: GitLab.Label, index: number) => (
          <div key={index}>
            <h2>{label.title}</h2>
            <p>{label.id}</p>
            <p>{label.description}</p>
            <p>Created at: {label.createdAt}</p>
          </div>
        ))}
    </div>
  );
};
