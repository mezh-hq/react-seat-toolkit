import { FOSS } from '@/icons';

const argTypes = {
  className: {
    description: 'Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict',
    type: 'string',
    table: {
      defaultValue: { summary: 'w-[74px] h-[42px]' },
    },
  },
  dark: {
    description: 'If true, the icon will be rendered in dark mode',
    table: {
      defaultValue: { summary: false },
    },
    type: 'boolean'
  },
};

export default {
  title: 'Icons/Foss',
  component: FOSS,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes,
};

export const Light = {
  argTypes
};

export const Dark = {
  args: {
    dark: true,
    className: "bg-black p-[8px] rounded-md"
  },
  argTypes
};