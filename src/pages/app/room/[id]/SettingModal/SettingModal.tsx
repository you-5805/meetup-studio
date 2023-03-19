import { isSettingModalOpenedState } from '../state';
import { staticPath } from '@/lib/$path';
import { useInvitation } from '@/hooks/useInvitation';
import { useDeleteEvent } from '@/hooks/useDeleteEvent';
import { XMarkIcon } from '@heroicons/react/24/solid';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useRecoilState } from 'recoil';
import type { Room } from '@/types/Room';

type Props = {
  room: Room;
};

export const SettingModal = ({ room }: Props) => {
  const [isOpen, setIsOpen] = useRecoilState(isSettingModalOpenedState);
  const { invitationUrl, hasCopied, copyUrl } = useInvitation(room.id);
  const { deleteEvent } = useDeleteEvent(room.id);

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed top-0 left-0 h-screen w-screen animate-appear bg-black bg-opacity-50 data-[state=open]:animate-appear data-[state=closed]:animate-disappear' />
        <RadixDialog.Content className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-md bg-white p-6 shadow-xl'>
          <div className='flex min-w-[500px] items-start justify-between'>
            <RadixDialog.Title className='w-full text-center text-2xl font-bold md:text-left'>
              イベントの設定
            </RadixDialog.Title>

            <RadixDialog.Close asChild>
              <button aria-label='モーダルを閉じる'>
                <XMarkIcon className='h-6 w-6 text-gray-600' aria-hidden='true' />
              </button>
            </RadixDialog.Close>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <h2 className='text-xl font-bold'>イベント運営チーム</h2>

            <ul className='grid grid-cols-1 gap-4 shadow-md shadow-slate-300'>
              {[
                { ...room.owner, role: 'owner' as const },
                ...room.cohosts.map((c) => ({ ...c, role: 'cohost' as const })),
              ].map(({ uid, img, name }) => (
                <li key={uid} className='flex items-center gap-3 p-2'>
                  <img height={32} width={32} src={img ?? staticPath.img.icon_svg} alt={name} />
                  <p>{name}</p>
                  <p></p>
                </li>
              ))}
            </ul>

            {invitationUrl ? (
              <div className='flex items-center justify-between gap-4'>
                <p className='w-1/6 text-sm'>招待用URL</p>

                <div className='relative w-5/6'>
                  <input
                    type='text'
                    readOnly
                    value={invitationUrl}
                    disabled
                    className='w-full rounded-md border border-gray-300 bg-gray-100 p-1 text-gray-500'
                  />

                  <button
                    type='button'
                    className='absolute top-1.5 right-1 flex items-center gap-1 rounded-md bg-white px-1 py-0.5 text-sm shadow-lg hover:bg-gray-100'
                    onClick={copyUrl}
                    aria-label='招待用URLをコピー'
                    disabled={hasCopied}
                  >
                    {hasCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : (
              <div aria-busy='true' className='h-8 w-full animate-pulse bg-slate-200' />
            )}
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <h2 className='text-xl font-bold'>Advanced</h2>

            <button
              type='button'
              className='md:text-md animate-appear-slow rounded border border-red-500 bg-white py-1.5 px-2 text-sm font-bold text-red-500 transition-colors hover:bg-gray-50 hover:text-red-400 md:py-2 md:px-4'
              onClick={deleteEvent}
            >
              イベントを削除
            </button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
