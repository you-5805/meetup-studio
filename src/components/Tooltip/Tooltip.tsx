import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  label: ReactNode;
}>;

export const Tooltip = ({ label, children }: Props) => {
  return (
    <RadixTooltip.Root delayDuration={200}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content className='mb-3 max-w-md rounded-md bg-black bg-opacity-80 px-2 py-1.5 text-white data-[state=delayed-open]:animate-appear'>
          {label}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export const TooltipProvider = (props: ComponentProps<typeof RadixTooltip.Provider>) => {
  return <RadixTooltip.Provider {...props} />;
};
