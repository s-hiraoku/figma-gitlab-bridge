import { type Meta, type StoryObj } from "@storybook/react";
import { ColorCircle } from "./ColorCircle";

export default {
  component: ColorCircle,
} as Meta<typeof ColorCircle>;

export const Default: StoryObj<typeof ColorCircle> = {
  args: { color: "#0D99FF" },
};
