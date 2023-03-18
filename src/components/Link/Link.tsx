import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<LinkProps>;

export const Link = (props: Props) => {
  return <NextLink {...props} />;
};
