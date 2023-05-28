import { LoadingScreen } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: LoadingScreen,
} satisfies Meta<typeof LoadingScreen>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;
