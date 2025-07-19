import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from "react";
import ListWrapper from './ListWrapper';

const meta: Meta<typeof ListWrapper> = {
  title: "Composite/List",
  component: ListWrapper,
  argTypes: {
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof ListWrapper>;


const Template: Story = {
  render: (args: any) => {
    return (
      <ListWrapper {...args}/>
    );
  },
};


export const Playground = {
  ...Template, args: {
    renderFromChildren: false
  }
};
