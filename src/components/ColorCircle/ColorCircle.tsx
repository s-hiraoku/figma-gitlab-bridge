import { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./ColorCircle.module.css";

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

  const animationClass = color === "all" ? styles.colorChange : "";

  return (
    <Tag
      {...props}
      className={`rounded-full ${props.className || ""} ${animationClass}`}
      style={{
        backgroundColor: color !== "all" ? color : undefined,
        width: circleSize,
        height: circleSize,
      }}
    />
  );
};
