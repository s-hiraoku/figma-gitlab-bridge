import { type Meta, type StoryObj } from "@storybook/react";
import { BottomToolbar } from "./BottomToolbar";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default {
  component: BottomToolbar,
} as Meta<typeof BottomToolbar>;

export const Default: StoryObj<typeof BottomToolbar> = {
  args: {
    children: (
      <Button
        variant="contained"
        startIcon={<RestartAltIcon />}
        color="success"
      >
        Test
      </Button>
    ),
  },
};
