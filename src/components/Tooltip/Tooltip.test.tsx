import * as stories from './Tooltip.stories';
import { act, render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

const { Default, Focused } = composeStories(stories);

describe('Tooltip', () => {
  it('renders unchanged', () => {
    const { queryByRole, asFragment } = render(<Default />);

    expect(queryByRole('tooltip')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('tooltip should be visible when focused', async () => {
    const { getByRole, container } = render(<Focused />);

    await act(() => Focused.play({ canvasElement: container }));

    expect(getByRole('tooltip', { name: 'content' })).toBeDefined();
  });
});
