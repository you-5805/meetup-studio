import { CopyLinkButton } from '../CopyLinkButton/CopyLinkButton';
import { QrImage } from '../QrImage/QrImage';
import { CommentCard } from '../CommentCard/CommentCard';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/cn';
import { pagesPath } from '@/lib/$path';
import logo from 'public/img/logo.png';
import { NoSymbolIcon, TvIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export const Studio = () => {
  useUser({ required: true });

  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

  return (
    <>
      <div className='relative grid h-[calc(100vh-56px)] grid-cols-3 gap-3 bg-gray-100 p-2 lg:grid-cols-4'>
        <div className='col-span-2 mx-auto aspect-video max-h-[calc(100vh-80px)] self-center lg:col-span-3'>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={cn('rounded-md bg-black shadow-lg', {
              'h-full w-full': isDisplaying,
              'h-0 w-0': !isDisplaying,
            })}
          />

          {!isDisplaying && <p className='text-xl'>イベントの開始までしばらくお待ちください</p>}
        </div>

        <div className='col-span-1'>
          <CommentCard />
        </div>

        <QrImage />
      </div>

      <div className='absolute bottom-0 flex h-14 w-full items-center justify-center gap-8 bg-gray-800'>
        <div className='absolute top-4 left-4'>
          <Link href={pagesPath.$url()}>
            <span className='relative inline-block h-[25px] w-[160px]'>
              <Image src={logo} fill alt='Meetup Studio' />
            </span>
          </Link>
        </div>

        {isDisplaying ? (
          <Tooltip label='画面共有を停止'>
            <button type='button' aria-label='画面共有を停止' onClick={stopDisplaying}>
              <NoSymbolIcon color='white' className='h-10 w-10 hover:opacity-80' />
            </button>
          </Tooltip>
        ) : (
          <Tooltip label='画面共有を開始'>
            <button type='button' onClick={startDisplaying} aria-label='画面共有を開始'>
              <TvIcon color='white' className='h-10 w-10 hover:opacity-80' />
            </button>
          </Tooltip>
        )}

        <CopyLinkButton />
      </div>
    </>
  );
};
