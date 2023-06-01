import { type Meta, type StoryObj } from "@storybook/react";
import { FigmaPreview } from "./FigmaPreview";

export default {
  component: FigmaPreview,
  decorators: [
    (Story) => (
      <div className="w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof FigmaPreview>;

export const Default: StoryObj<typeof FigmaPreview> = {
  args: {
    url: "https://www.figma.com/file/4sksS2cEOssAU240StXgiw/%E7%84%A1%E9%A1%8C?type=whiteboard&node-id=0-1&t=ei8cjoA0XamYEduD-0",
  },
};
