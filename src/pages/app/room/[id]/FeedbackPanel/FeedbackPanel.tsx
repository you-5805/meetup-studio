import { ReactionPanel } from '../ReactionPanel/ReactionPanel';
import { Layout } from '@/components/Layout/Layout';
import { usePostComment } from '@/hooks/usePostComment';
import { SignInModal } from '@/pages/SignInModal/SignInModal';
import { ChatBubbleLeftEllipsisIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useId, useState } from 'react';
import type { User } from 'firebase/auth';
import type { Room } from '@/types/Room';

type Props = {
  room: Room;
  user: User | null;
};

const PLACEHOLDERS = [
  'わいわい',
  'そこもうちょっと詳しく聞きたいです！',
  'よろしくお願いします🙌',
  '88888888',
  'これはいい話',
  '完全に理解した',
];

export const FeedbackPanel = ({ room, user }: Props) => {
  const { comment, onChangeComment, isPosting, hasPosted, onSubmit } = usePostComment({ roomId: room.id, user });
  const helpId = useId();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length), 5000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Layout>
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-center text-2xl font-bold'>{room.name}</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className='flex flex-col items-center gap-3'
        >
          <textarea
            rows={3}
            autoFocus
            placeholder={PLACEHOLDERS[placeholderIndex]}
            className='w-80 rounded-lg border p-3'
            value={comment}
            onChange={onChangeComment}
            onKeyDown={(e) => e.metaKey && e.key === 'Enter' && onSubmit()}
            aria-describedby={helpId}
          />

          <button
            type='submit'
            aria-label='コメント'
            disabled={isPosting}
            className='flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 p-2 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-300'
          >
            <span className='text-lg font-bold text-white'>コメント</span>
            {hasPosted ? (
              <CheckIcon aria-hidden='true' color='white' className='h-6 w-6' />
            ) : (
              <ChatBubbleLeftEllipsisIcon aria-hidden='true' color='white' className='h-6 w-6' />
            )}
          </button>

          <p id={helpId} className='flex items-center gap-1 text-xs'>
            <span className='rounded-md border border-slate-300 bg-slate-200 px-1 py-0.5 font-mono'>⌘+Enter</span>
            <span>or</span>
            <span className='rounded-md border border-slate-300 bg-slate-200 px-1 py-0.5 font-mono'>Ctrl+Enter</span>
          </p>
        </form>

        <ReactionPanel roomId={room.id} user={user} />
      </div>

      <SignInModal afterSignIn={null} />
    </Layout>
  );
};
