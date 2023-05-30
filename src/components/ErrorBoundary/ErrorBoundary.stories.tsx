import { type Meta, type StoryObj } from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { FetchError } from "@components/FetchError";

export default {
  component: ErrorBoundary,
} as Meta<typeof ErrorBoundary>;

export const Default: StoryObj<typeof ErrorBoundary> = {
  args: { fallback: <FetchError /> },
};
