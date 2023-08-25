import { BashawayPortal } from '@/icons';

const argTypes = {
  className: {
    description: 'Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict',
    type: 'string',
    table: {
      defaultValue: { summary: 'w-[74px] h-[30px]' },
    },
  },
};

export default {
  title: 'Icons/Portal',
  component: BashawayPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes,
};

export const Default = {
  argTypes
};