import { XMarkIcon } from '@heroicons/react/24/solid';
import * as RadixDialog from '@radix-ui/react-dialog';

type Props = {
  isOpen: boolean;
  setIsOpen: (opened: boolean) => void;
};

export const SettingModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed left-0 top-0 h-screen w-screen animate-appear bg-black bg-opacity-50 data-[state=closed]:animate-disappear data-[state=open]:animate-appear' />
        <RadixDialog.Content className='fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-md bg-white p-6 shadow-xl'>
          <div className='flex min-w-[600px] items-start justify-between'>
            <RadixDialog.Title className='w-full text-center text-2xl font-bold md:text-left'>
              イベントの設定
            </RadixDialog.Title>

            <RadixDialog.Close asChild>
              <button aria-label='モーダルを閉じる'>
                <XMarkIcon className='h-6 w-6 text-gray-600' aria-hidden='true' />
              </button>
            </RadixDialog.Close>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
