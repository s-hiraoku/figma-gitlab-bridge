import { useMemo } from "react";
import { GitLab } from "@types";
import { CREATE_ISSUE_MUTATION, gitLabIssuesQueries } from "./queries";
import { useGitLabSettings } from "@features/hooks/useGitLabSettings";
import { useGraphQLApiClient } from "@hooks/useGraphQLApiClient";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DeepPartial } from "@utils/deepPartial";

export const useGitLabIssues = () => {
  const { getGitLabAPIEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const gitLabAPIEndpoint = useMemo(
    () => getGitLabAPIEndpoint(),
    [getGitLabAPIEndpoint]
  );
  const gitLabAccessToken = useMemo(
    () => getGitLabAccessToken(),
    [getGitLabAccessToken]
  );
  const gitLabProjectPath = useMemo(
    () => getGitLabProjectPath(),
    [getGitLabProjectPath]
  );

  const defaultVariables = useMemo(() => {
    return { fullPath: gitLabProjectPath };
  }, [gitLabProjectPath]);

  const requestHeaders = useMemo(() => {
    return {
      authorization: `Bearer ${gitLabAccessToken}`,
    };
  }, [gitLabAccessToken]);

  const { graphQLApiClient } = useGraphQLApiClient(
    gitLabAPIEndpoint ?? "",
    requestHeaders
  );

  const query: UseQueryResult<GitLab.IssueData> = useQuery({
    ...gitLabIssuesQueries.list(graphQLApiClient, defaultVariables),
    suspense: false, // TODO: I wanted to use Suspense, but since it didn't work, I've set it to false.
    enabled: !!gitLabAPIEndpoint && !!gitLabProjectPath && !!gitLabAccessToken,
  });

  const queryClient = useQueryClient();
  const { queryKey } = gitLabIssuesQueries.list(
    graphQLApiClient,
    defaultVariables
  );

  const createIssue = (
    variables: Omit<DeepPartial<GitLab.Issue>, "createAt">
  ) => {
    const { title, description, labels } = variables;
    const stringLabels = labels?.nodes?.map((label) => label.title);
    return graphQLApiClient.request(CREATE_ISSUE_MUTATION, {
      projectPath: gitLabProjectPath,
      title,
      description,
      labels: stringLabels,
    });
  };

  const mutation = useMutation(createIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      throw error;
    },
  });

  return {
    data: query.data,
    getIssues: query.refetch,
    createIssue: mutation.mutateAsync,
  };
};
