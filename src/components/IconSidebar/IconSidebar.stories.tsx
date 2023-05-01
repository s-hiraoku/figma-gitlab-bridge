import { type Meta, type StoryObj } from "@storybook/react";
import { IconSidebar } from "./IconSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import { IconButton } from "@mui/material";

export default {
  component: IconSidebar,
  decorators: [
    (Story) => (
      <div style={{ width: "40px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof IconSidebar>;

export const Default: StoryObj<typeof IconSidebar> = {
  args: {
    icons: [
      // eslint-disable-next-line react/jsx-key
      <IconButtonWithTooltip
        icon={<MenuIcon />}
        tooltipText={"menu"}
        color="inherit"
      />,
      // eslint-disable-next-line react/jsx-key
      <IconButton color="inherit">
        <SettingsIcon />
      </IconButton>,
      // eslint-disable-next-line react/jsx-key
      <IconButton color="inherit">
        <HelpIcon />
      </IconButton>,
    ],
  },
};
