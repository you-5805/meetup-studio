import * as stories from './LoadingScreen.stories';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

const { Default } = composeStories(stories);

describe('LoadingScreen', () => {
  it('renders unchanged', () => {
    const { getByText, asFragment } = render(<Default />);

    expect(getByText('loading...')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
