import type { StorybookConfig } from "@storybook/nextjs";
import type { Configuration } from "webpack";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config): Promise<Configuration> => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@components": path.resolve(__dirname, "../src/components"),
        "@pages": path.resolve(__dirname, "../src/pages"),
        "@features": path.resolve(__dirname, "../src/features"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
        "@config": path.resolve(__dirname, "../src/config"),
        "@lib": path.resolve(__dirname, "../src/lib"),
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@stores": path.resolve(__dirname, "../src/stores"),
      },
    };
    return config;
  },
};
export default config;
