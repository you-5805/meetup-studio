import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  label: ReactNode;
  arrow?: boolean;
}>;

export const Tooltip = ({ label, arrow = false, children }: Props) => {
  return (
    <RadixTooltip.Root delayDuration={0}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content className='mb-3 rounded-md bg-black bg-opacity-80 px-2 py-1.5 text-white'>
          {label}
          {arrow && <RadixTooltip.Arrow />}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export const TooltipProvider = (props: ComponentProps<typeof RadixTooltip.Provider>) => {
  return <RadixTooltip.Provider {...props} />;
};
