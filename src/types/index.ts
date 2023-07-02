export * as Figma from "./figma";
export * as GitLab from "./gitLab";

export type { RequestConfig } from "./axios";

export type valueOf<T> = T[keyof T];

export type AppType = {
  id: string;
  icon: React.ReactNode;
  path: string;
};

export type ArrayElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;
