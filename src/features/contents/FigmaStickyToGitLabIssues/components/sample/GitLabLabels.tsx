// GitLab の issues を取得して表示するサンプルコンポーネント

import React from "react";

import { useGitLabLabels } from "@hooks/useGitLabLabels";

export const GitLabLabels = () => {
  const { data } = useGitLabLabels();

  return (
    <div>
      {data &&
        data.project &&
        data.project.labels.nodes.map((label: any, index: any) => (
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
