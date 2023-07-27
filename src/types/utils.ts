export type valueOf<T> = T[keyof T];

export type AppType = {
  id: string;
  icon: React.ReactNode;
  path: string;
};

export type ArrayElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type Size = `${number}${"px" | "rem" | "em" | "vh" | "vw" | "%"}`;

export type Dimensions = {
  width: Size;
  height: Size;
};

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;
