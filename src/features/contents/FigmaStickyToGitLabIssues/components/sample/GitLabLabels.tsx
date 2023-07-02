// GitLab の issues を取得して表示するサンプルコンポーネント

import React, { useEffect } from "react";

import { useGitLabLabels } from "@hooks/useGitLabLabels";

export const GitLabLabels = () => {
  const { data, error, isLoading, getLabels } = useGitLabLabels();

  useEffect(
    () => {
      getLabels();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
