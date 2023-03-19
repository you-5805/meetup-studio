import { CopyLinkButton } from '../CopyLinkButton/CopyLinkButton';
import { QrImage } from '../QrImage/QrImage';
import { CommentCard } from '../CommentCard/CommentCard';
import { isSettingModalOpenedState } from '../state';
import { ReactionField } from '../ReactionFIeld/ReactionField';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/cn';
import { pagesPath } from '@/lib/$path';
import logo from 'public/img/logo.png';
import { NoSymbolIcon, TvIcon, Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilCallback } from 'recoil';
import type { Room } from '@/types/Room';

type Props = {
  room: Room;
};

export const Studio = ({ room }: Props) => {
  useUser({ required: true });

  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

  const openSettingModal = useRecoilCallback(
    ({ set }) =>
      () =>
        set(isSettingModalOpenedState, true),
    []
  );

  return (
    <>
      <ReactionField roomId={room.id} />

      <div className='relative grid h-[calc(100vh-56px)] grid-cols-3 gap-3 bg-gray-100 p-2 lg:grid-cols-4 xl:grid-cols-5'>
        <div className='col-span-2 mx-auto aspect-video max-h-[calc(100vh-80px)] self-center lg:col-span-3 xl:col-span-4'>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={cn('rounded-md bg-black shadow-lg', {
              'h-full w-full': isDisplaying,
              'h-0 w-0': !isDisplaying,
            })}
          />

          {!isDisplaying && <p className='text-xl'>画面を共有してください</p>}
        </div>

        <div className='col-span-1'>
          <CommentCard room={room} />
        </div>

        <QrImage />
      </div>

      <div className='fixed bottom-0 flex h-14 w-full items-center justify-between bg-gray-800 px-8'>
        <div className='text-xl font-bold text-white'>
          <h1>{room.name}</h1>
        </div>

        <div className='flex items-center justify-center gap-6'>
          {isDisplaying ? (
            <Tooltip label='画面共有を停止'>
              <button type='button' aria-label='画面共有を停止' onClick={stopDisplaying}>
                <NoSymbolIcon color='white' className='h-8 w-8 hover:opacity-80' />
              </button>
            </Tooltip>
          ) : (
            <Tooltip label='画面共有を開始'>
              <button type='button' onClick={startDisplaying} aria-label='画面共有を開始'>
                <TvIcon color='white' className='h-8 w-8 hover:opacity-80' />
              </button>
            </Tooltip>
          )}

          <CopyLinkButton />

          <Tooltip label='設定'>
            <button type='button' aria-label='設定モーダルを開く' onClick={openSettingModal}>
              <Cog6ToothIcon color='white' className='h-8 w-8 hover:opacity-80' />
            </button>
          </Tooltip>

          <Tooltip label='投票 (comming soon)'>
            <button type='button' aria-label='投票 (comming soon)' onClick={() => alert('未実装の機能です')}>
              <ChatBubbleLeftEllipsisIcon color='gray' className='h-8 w-8 cursor-not-allowed hover:opacity-80' />
            </button>
          </Tooltip>
        </div>

        <Link href={pagesPath.$url()}>
          <span className='relative mt-2 inline-block h-[25px] w-[160px]'>
            <Image src={logo} fill alt='Meetup Studio' />
          </span>
        </Link>
      </div>
    </>
  );
};
