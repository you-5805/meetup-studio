import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { PlayCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

  return (
    <>
      <div className='item-center flex h-[calc(100vh-64px)] justify-center overflow-hidden rounded-md bg-gray-100 p-8'>
        <video ref={videoRef} autoPlay playsInline className='aspect-video w-full self-center' />
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
