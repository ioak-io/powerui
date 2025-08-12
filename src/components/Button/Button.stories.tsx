import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import ButtonVariantType from "../../types/ButtonVariantType";
import ThemeType from "../../types/ThemeType";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    onClick: { action: "clicked" }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    theme: ThemeType.primary,
    variant: ButtonVariantType.default
  }
};

export const Secondary: Story = {
  args: {
    children: "Default Theme",
    theme: ThemeType.default,
    variant: ButtonVariantType.default
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args}>Medium</Button>
    </div>
  )
};

export const Loading: Story = {
  args: {
    children: "Submitting",
    loading: true
  }
};


