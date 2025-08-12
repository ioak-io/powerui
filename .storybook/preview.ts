import type { Preview } from "@storybook/react";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;

export const globalTypes = {
  theme: {
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      title: "Theme",
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" }
      ],
      dynamicTitle: true
    }
  }
} as const;

export const decorators = [
  (Story, context) => {
    const mode = context.globals.theme === "dark" ? "dark" : "light";
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.toggle("dark", mode === "dark");
      root.classList.toggle("light", mode === "light");
      // Helps native form controls match theme where supported
      (root as HTMLElement & { style: CSSStyleDeclaration }).style.colorScheme = mode;
    }
    return Story();
  }
];


