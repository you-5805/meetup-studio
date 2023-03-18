import { CommentCard } from './CommentCard/CommentCard';
import { CopyLinkButton } from './CopyLinkButton/CopyLinkButton';
import { QrImage } from './QrImage/QrImage';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { NoSymbolIcon, TvIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

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

        <QrImage />
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
              <TvIcon color='white' className='h-10 w-10 hover:opacity-80' />
            </button>
          </Tooltip>
        )}

        <Tooltip label='この部屋のURLをコピー'>
          <CopyLinkButton />
        </Tooltip>
      </div>
    </>
  );
}
