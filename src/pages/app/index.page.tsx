import { CommentCard } from './CommentCard/CommentCard';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { images } from '@/lib/images';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { NoSymbolIcon, ShareIcon, PlayCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Page() {
  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();
  const [isQrMinimized, setIsQrMinimized] = useState(false);
  const toggleQrSize = () => setIsQrMinimized((prev) => !prev);
  const buttonLabel = isQrMinimized ? '拡大' : '縮小';
  const [hasCopied, setHasCopied] = useState(false);
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 500);
  };

  return (
    <>
      <div className='relative grid h-[calc(100vh-56px)] grid-cols-3 gap-3 bg-gray-100 p-2 lg:grid-cols-4'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className='col-span-2 mx-auto aspect-video max-h-[calc(100vh-80px)] self-center rounded-md bg-black shadow-lg lg:col-span-3'
        />

        <div className='col-span-1'>
          <CommentCard />
        </div>

        <div className='absolute left-4 bottom-4 shadow-2xl'>
          <button
            type='button'
            className={cn('group relative block', {
              'h-20 w-20': isQrMinimized,
              'h-60 w-60': !isQrMinimized,
            })}
            onClick={toggleQrSize}
            aria-label={`QRコードを${buttonLabel}`}
          >
            <Image src={images.qr_png} fill alt='この部屋へのQRコード' />

            <span className='absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-black bg-opacity-60 group-hover:flex'>
              <span className='text-white'>{isQrMinimized ? '拡大' : '縮小'}</span>
            </span>
          </button>
        </div>
      </div>

      <div className='absolute bottom-0 flex h-14 w-full items-center justify-center gap-8 bg-gray-800 font-bold text-white'>
        {isDisplaying ? (
          <Tooltip label='画面共有を停止'>
            <button type='button' aria-label='画面共有を停止' onClick={stopDisplaying}>
              <NoSymbolIcon color='white' className='h-10 w-10 hover:opacity-80' />
            </button>
          </Tooltip>
        ) : (
          <Tooltip label='画面共有を開始'>
            <button type='button' onClick={startDisplaying} aria-label='画面共有を開始'>
              <PlayCircleIcon color='white' className='h-10 w-10 hover:opacity-80' />
            </button>
          </Tooltip>
        )}

        <Tooltip label='この部屋のURLをコピー'>
          <button type='button' aria-label='この部屋のURLをコピー' onClick={copyUrl}>
            {hasCopied ? (
              <CheckIcon className='h-10 w-10 hover:opacity-80' />
            ) : (
              <ShareIcon color='white' className='h-10 w-10 hover:opacity-80' />
            )}
          </button>
        </Tooltip>
      </div>
    </>
  );
}
