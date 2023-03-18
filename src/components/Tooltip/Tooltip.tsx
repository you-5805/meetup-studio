import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ComponentProps, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
}>;

export const Tooltip = ({ label, children }: Props) => {
  return (
    <RadixTooltip.Root delayDuration={0}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content className='px-2 py-1.5 mb-1 bg-black rounded-md bg-opacity-80 text-white'>
          {label}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export const TooltipProvider = (props: ComponentProps<typeof RadixTooltip.Provider>) => {
  return <RadixTooltip.Provider {...props} />;
};
