import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-300'
    />
  );
};
