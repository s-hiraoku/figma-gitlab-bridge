import { type Meta, type StoryObj } from "@storybook/react";
import { IconButtonWithTooltip } from "./IconButtonWithTooltip";
import MenuIcon from "@mui/icons-material/Menu";

export default {
  component: IconButtonWithTooltip,
  args: { icon: <MenuIcon />, tooltipText: "Menu" },
} as Meta<typeof IconButtonWithTooltip>;

export const Default: StoryObj<typeof IconButtonWithTooltip> = {};

export const Disabled: StoryObj<typeof IconButtonWithTooltip> = {
  args: { disabled: true },
};
