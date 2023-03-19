import { isSettingModalOpenedState } from '../state';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useRecoilState } from 'recoil';
import { XMarkIcon } from '@heroicons/react/24/solid';
import type { Room } from '@/types/Room';

type Props = {
  room: Room;
};

export const SettingModal = ({ room }: Props) => {
  console.log(room);
  const [isOpen, setIsOpen] = useRecoilState(isSettingModalOpenedState);

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed top-0 left-0 h-screen w-screen animate-appear bg-black bg-opacity-30 data-[state=open]:animate-appear data-[state=closed]:animate-disappear' />
        <RadixDialog.Content className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6 shadow-xl'>
          <div className='flex min-w-[500px] items-start justify-between'>
            <RadixDialog.Title className='w-full text-center text-xl font-bold md:text-left'>
              イベントの設定
            </RadixDialog.Title>

            <RadixDialog.Close asChild>
              <button aria-label='モーダルを閉じる'>
                <XMarkIcon className='h-6 w-6 text-gray-600' aria-hidden='true' />
              </button>
            </RadixDialog.Close>
          </div>

          <p>様々な設定項目</p>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
