import { type Meta, type StoryObj } from "@storybook/react";
import { FetchError } from "./FetchError";

export default {
  component: FetchError,
  args: {},
} as Meta<typeof FetchError>;

export const Default: StoryObj<typeof FetchError> = {};
