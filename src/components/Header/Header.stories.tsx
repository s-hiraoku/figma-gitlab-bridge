import { type Meta, type StoryObj } from "@storybook/react";
import { Header } from "./Header";

export default {
  component: Header,
  args: {},
} as Meta<typeof Header>;

export const Default: StoryObj<typeof Header> = {};
