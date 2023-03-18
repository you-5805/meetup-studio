import { useQrUrl } from '@/hooks/useQrUrl';
import { cn } from '@/lib/cn';
import { useState } from 'react';
import Image from 'next/image';

export const QrImage = () => {
  const [isQrMinimized, setIsQrMinimized] = useState(false);
  const toggleQrSize = () => setIsQrMinimized((prev) => !prev);
  const buttonLabel = isQrMinimized ? '拡大' : '縮小';
  const qrUrl = useQrUrl();

  if (qrUrl === null) return null;

  return (
    <div className='absolute left-4 bottom-4 overflow-hidden rounded-lg shadow-2xl'>
      <button
        type='button'
        className={cn('group relative block transition-all duration-500 ease-in-out', {
          'h-20 w-20': isQrMinimized,
          'h-60 w-60': !isQrMinimized,
        })}
        onClick={toggleQrSize}
        aria-label={`QRコードを${buttonLabel}`}
      >
        <Image src={qrUrl} fill alt='この部屋へのQRコード' className='scale-110' />

        <span className='absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-black bg-opacity-60 group-hover:flex'>
          <span className='text-white'>{isQrMinimized ? '拡大' : '縮小'}</span>
        </span>
      </button>
    </div>
  );
};
