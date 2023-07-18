import { type Meta, type StoryObj } from "@storybook/react";
import { CheckboxMenu, CheckboxMenuItems } from "./CheckboxMenu";

const sampleMenuItems: CheckboxMenuItems<string> = [
  { label: <div>Option 1</div>, value: "option1" },
  { label: <div>Option 2</div>, value: "option2" },
  { label: <div>Option 3</div>, value: "option3" },
  { label: <div>Option 4</div>, value: "option4" },
];

export default {
  component: CheckboxMenu,
} as Meta<typeof CheckboxMenu>;

export const Default: StoryObj<typeof CheckboxMenu> = {
  args: { id: "sample", items: sampleMenuItems, label: "Checkbox Menu" },
};
