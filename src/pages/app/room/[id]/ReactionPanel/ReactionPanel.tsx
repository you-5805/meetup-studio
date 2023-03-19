import { SkinToneSelect } from '../SkinToneSelect/SkinToneSelect';
import { usePostReaction } from '@/hooks/usePostReaction';
import { cn } from '@/lib/cn';
import { useState } from 'react';
import type { User } from 'firebase/auth';

type Props = {
  roomId: string;
  user: User | null;
};

export const skinTones = ['', '&#127999;', '&#127998;', '&#127997;', '&#127996;', '&#127995;'] as const;
export type SkinTone = (typeof skinTones)[number];

export const ReactionPanel = ({ roomId, user }: Props) => {
  const { postReaction } = usePostReaction(roomId, user);
  const [skinTone, setSkinTone] = useState<SkinTone>('');

  return (
    <div className='flex flex-col items-center gap-4 pb-12'>
      <SkinToneSelect skinTone={skinTone} setSkinTone={setSkinTone} />
      <div className='grid grid-cols-3 gap-4 text-5xl'>
        {[
          {
            emoji: `&#128640;`,
            className: 'border-blue-200 shadow-blue-300 bg-blue-50',
          },
          {
            emoji: `&#128079;${skinTone}`,
            className: 'border-purple-200 shadow-purple-300 bg-purple-50',
          },
          {
            emoji: `&#128552;`,
            className: 'border-orange-200 shadow-orange-300 bg-orange-50',
          },
          {
            emoji: `&#128075;${skinTone}`,
            className: 'border-gray-200 shadow-gray-300 bg-gray-50',
          },
          {
            emoji: `&#128519;`,
            className: 'border-green-200 shadow-green-300 bg-green-50',
          },
          {
            emoji: `&#127867;`,
            className: 'border-orange-200 shadow-orange-300 bg-orange-50',
          },
          {
            emoji: `&#127881;`,
            className: 'border-yellow-200 shadow-yellow-300 bg-yellow-50',
          },
          {
            emoji: `&#128175;`,
            className: 'border-red-200 shadow-red-300 bg-red-50',
          },
          {
            emoji: `&#128170;${skinTone}`,
            className: 'border-yellow-200 shadow-yellow-300 bg-yellow-50',
          },
        ].map(({ emoji, className }) => (
          <Panel key={emoji} emoji={emoji} className={className} post={() => postReaction(emoji)} />
        ))}
      </div>
    </div>
  );
};

const Panel = ({ emoji, className, post }: { emoji: string; className?: string; post: () => void }) => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    if (clicked) return;

    post();
    setClicked(true);
    setTimeout(() => setClicked(false), 700);
  };

  return (
    <button
      type='button'
      className={cn('rounded-lg p-6 shadow-lg transition-transform hover:rotate-12', className, {
        'animate-ping-fast': clicked,
      })}
      disabled={clicked}
      onClick={onClick}
    >
      <span dangerouslySetInnerHTML={{ __html: emoji }} />
    </button>
  );
};
