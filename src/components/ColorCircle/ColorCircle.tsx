import { ComponentPropsWithoutRef, ElementType } from "react";

type ColorCircleProps<T extends ElementType> = {
  tag?: T;
  color: string;
  size?: string | number;
} & Omit<ComponentPropsWithoutRef<T>, "tag">;

export const ColorCircle = <T extends ElementType>({
  tag,
  color,
  size = 20,
  ...props
}: ColorCircleProps<T>) => {
  const circleSize = typeof size === "number" ? `${size}px` : size;
  const Tag = tag || "div";
  return (
    <Tag
      {...props}
      className={`rounded-full ${props.className || ""}`}
      style={{
        backgroundColor: color,
        width: circleSize,
        height: circleSize,
      }}
    />
  );
};
