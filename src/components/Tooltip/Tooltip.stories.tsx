import { Tooltip, TooltipProvider } from './Tooltip';
import { userEvent } from '@storybook/testing-library';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Tooltip,
  decorators: [(story) => <TooltipProvider>{story()}</TooltipProvider>],
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Default = {
  args: {
    label: 'content',
    children: (
      <button type='button' className='rounded-lg bg-orange-500 p-2 text-white'>
        Trigger
      </button>
    ),
  },
} satisfies StoryObj<typeof meta>;

export const Focused = {
  ...Default,
  play: async () => {
    await userEvent.tab();
  },
} satisfies StoryObj<typeof meta>;
