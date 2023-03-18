import { CommentCard } from './CommentCard/CommentCard';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { NoSymbolIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

  return (
    <>
      <div className='grid h-[calc(100vh-64px)] grid-cols-3 gap-3 bg-gray-100 p-2 lg:grid-cols-4'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className='col-span-2 mx-auto aspect-video max-h-[calc(100vh-80px)] self-center rounded-md bg-black shadow-lg lg:col-span-3'
        />

        <div className='col-span-1'>
          <CommentCard />
        </div>
      </div>

      <div className='absolute bottom-0 flex h-16 w-full items-center justify-center bg-gray-800 py-4 font-bold text-white'>
        {isDisplaying ? (
          <Tooltip label='画面共有を停止'>
            <button type='button' aria-label='画面共有を停止' onClick={stopDisplaying}>
              <NoSymbolIcon color='white' className='h-12 w-12 hover:opacity-80' />
            </button>
          </Tooltip>
        ) : (
          <Tooltip label='画面共有を開始'>
            <button type='button' onClick={startDisplaying} aria-label='画面共有を開始'>
              <PlayCircleIcon color='white' className='h-12 w-12 hover:opacity-80' />
            </button>
          </Tooltip>
        )}
      </div>
    </>
  );
}
