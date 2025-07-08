// ConversationalForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import ConversationalFormDemo from './ConversationalFormDemo';

const meta: Meta<typeof ConversationalFormDemo> = {
  title: 'Conversational Form',
  component: ConversationalFormDemo,
  tags: ['autodocs'],
} as Meta<typeof ConversationalFormDemo>;

export default meta;

type Story = StoryObj<typeof ConversationalFormDemo>;

export const Demo: Story = {
  args: {}
};
