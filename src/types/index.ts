export * as Figma from "./figma";

export type valueOf<T> = T[keyof T];

export type AppType = {
  id: string;
  icon: React.ReactNode;
};

export type ArrayElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;
