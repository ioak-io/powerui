import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  viteFinal: async (config) => {
    // Ensure Tailwind v4 Vite plugin runs in Storybook too
    const tailwind = (await import("@tailwindcss/vite")).default;
    config.plugins = [...(config.plugins || []), tailwind()];
    return config;
  },
  docs: {
    autodocs: "tag"
  },
  core: {
    disableTelemetry: true
  }
};

export default config;


