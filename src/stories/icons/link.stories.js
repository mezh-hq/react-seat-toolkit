import { Link } from '@/icons';

const argTypes = {
  className: {
    description: 'Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict',
    type: 'string',
    table: {
      defaultValue: { summary: 'text-black md:mt-0.5 pl-1.5 animated-chevron' },
    },
  },
};

export default {
  title: 'Icons/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes,
};

export const Default = {
  argTypes
};