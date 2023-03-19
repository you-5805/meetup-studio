import { Tooltip } from '@/components/Tooltip/Tooltip';
import { CheckIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const CopyLinkButton = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 500);
  };

  return (
    <Tooltip label='この部屋のURLをコピー'>
      <button type='button' aria-label='この部屋のURLをコピー' onClick={copyUrl}>
        {hasCopied ? (
          <CheckIcon color='white' className='h-10 w-10 hover:opacity-80' />
        ) : (
          <ShareIcon color='white' className='h-10 w-10 hover:opacity-80' />
        )}
      </button>
    </Tooltip>
  );
};
