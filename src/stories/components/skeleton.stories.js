import { Skeleton } from '@/components';
import { Button } from 'flowbite-react';

const argTypes = {
    containerClassName: {
        description: 'Any additional CSS classes to be passed into the root element. Existing classes will be overwritten in case of conflict',
        type: 'string'
    },
    className: {
        description: 'Any additional CSS classes to be passed into the skeleton element. Existing classes will be overwritten in case of conflict',
        type: 'string'
    },
    shade: {
        description: 'The shade of the skeleton',
        control: { type: 'radio' },
        options: ['light', 'dark'],
        table: {
            defaultValue: { summary: 'light' },
        },
    },
    count: {
        description: 'The number of skeleton items to render',
        type: 'number',
        table: {
            defaultValue: { summary: 1 },
        },
    },
};
export default {
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export const Default = {
    argTypes,
    args: {
        className: "w-[300px] h-[30px]"
    }
};

export const MultiLine = {
    argTypes,
    args: {
        className: "w-[300px] h-[30px]",
        count: 3,
    }
}

export const NestedSkeletons = {
    argTypes,
    args: {
        className: "p-12 flex flex-col gap-4",
        children: [
            Skeleton({ className: "w-[300px] h-[30px]", shade: "dark" }),
            Skeleton({ className: "w-[300px] h-[30px]", shade: "dark" }),
            Skeleton({ className: "w-[300px] h-[30px]", shade: "dark" }),
        ],
    }
}