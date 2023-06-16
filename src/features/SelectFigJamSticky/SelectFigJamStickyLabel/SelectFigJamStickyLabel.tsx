import { ComponentPropsWithoutRef, ElementType } from "react";
import { ColorCircle } from "@components/ColorCircle";

type Props<T extends ElementType> = {
  tag?: T;
  color?: string;
  label: string;
} & Omit<ComponentPropsWithoutRef<T>, "tag">;

export const SelectFigJamStickyLabel = <T extends ElementType>({
  tag,
  color,
  label,
  ...props
}: Props<T>) => {
  const Tag = tag || "div";
  return (
    <Tag {...props}>
      <div className={"flex items-center gap-2"}>
        {color ? <ColorCircle color={color} /> : <div className={"w-4"} />}
        <span>{label}</span>
      </div>
    </Tag>
  );
};
