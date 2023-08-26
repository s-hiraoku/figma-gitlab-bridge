import { type Meta, type StoryObj } from "@storybook/react";
import { EditIssueModal } from "./EditIssueModal";

export default {
  component: EditIssueModal,
  args: { open: true, issue: { title: "Fix bug", description: "description" } },
} as Meta<typeof EditIssueModal>;

export const Default: StoryObj<typeof EditIssueModal> = {};
