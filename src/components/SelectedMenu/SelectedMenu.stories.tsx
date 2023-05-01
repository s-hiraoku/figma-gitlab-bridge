import { type Meta, type StoryObj } from "@storybook/react";
import { SelectedMenu, SelectedMenuItems } from "./SelectedMenu";

const sampleMenuItems: SelectedMenuItems = [
  { label: <div>Option 1</div>, value: "option1" },
  { label: <div>Option 2</div>, value: "option2" },
  { label: <div>Option 3</div>, value: "option3" },
  { label: <div>Option 4</div>, value: "option4" },
];

export default {
  component: SelectedMenu,
} as Meta<typeof SelectedMenu>;

export const Default: StoryObj<typeof SelectedMenu> = {
  args: { items: sampleMenuItems, label: "Select Menu" },
};
