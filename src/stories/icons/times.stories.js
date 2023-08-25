import { Times } from '@/icons';

const argTypes = {
  className: {
    description: 'Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict',
    type: 'string',
    table: {
      defaultValue: { summary: 'h-[15px] w-[15px] text-black' },
    },
  },
};

export default {
  title: 'Icons/Times',
  component: Times,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes,
};

export const Default = {
  argTypes
};