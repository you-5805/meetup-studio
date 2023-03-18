import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useDisplayScreen } from '@/hooks/useDisplayScreen';
import { PlayCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const { videoRef, isDisplaying, startDisplaying, stopDisplaying } = useDisplayScreen();

  return (
    <div className='bg-gray-100 fixed inset-0 flex item-scenter p-8 justify-center'>
      <div className='w-full aspect-video rounded-md overflow-hidden'>
        <video ref={videoRef} autoPlay playsInline className='w-full h-full' />
      </div>

      <div className='absolute text-white font-bold w-full px-8 py-4 bottom-0 bg-black bg-opacity-60 backdrop-filter flex justify-center items-center backdrop-blur-sm'>
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
    </div>
  );
}
