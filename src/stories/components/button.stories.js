import Button from '@/components/button';

const argTypes = {
  variant: {
    options: ['primary', 'secondary'],
    control: { type: 'radio' },
    description: 'Changes the look of the button',
    table: {
      defaultValue: { summary: 'primary' },
    }
  },
  children: {
    description: 'Any JSX child to be passed into the button',
  },
  className: {
    description: 'Any additional CSS classes to be passed into the button. Existing classes will be overwritten in case of conflict',
    type: 'string'
  },
  loading: {
    description: 'If true, the button will be in a loading state',
    table: {
      defaultValue: { summary: false },
    },
    type: 'boolean'
  },
  to: {
    description: 'The URL to link to when the button is clicked. Should be used within a React Router',
    type: 'string'
  },
  target: {
    description: 'Specifies where to open the linked document. Should be used within a React Router',
    control: { type: 'radio' },
    options: ['_blank', '_self'],
    table: {
      defaultValue: { summary: '_self' },
    },
  },
  wrapperClassName: {
    description: 'Any additional CSS classes to be passed into the button wrapper. Should be used in conjunction with the `to` prop',
    type: 'string'
  },
};

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes,
};

export const Primary = {
  args: {
    variant: "primary",
    children: "I'm a primary button"
  },
  argTypes
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "I'm a secondary button"
  },
  argTypes
};

export const Loading = {
  args: {
    variant: "primary",
    children: "I'm loading",
    loading: true
  },
  argTypes
};