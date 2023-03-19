import { Layout } from '@/components/Layout/Layout';
import { usePostComment } from '@/hooks/usePostComment';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { PaperAirplaneIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useId } from 'react';
import type { User } from 'firebase/auth';
import type { Room } from '@/types/Room';

type Props = {
  room: Room;
  user: User | null;
};

export const FeedbackPanel = ({ room, user }: Props) => {
  const { comment, onChangeComment, isPosting, hasPosted, onSubmit } = usePostComment({ roomId: room.id, user });
  const helpId = useId();

  return (
    <Layout>
      <div className='flex flex-col items-center gap-12'>
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
            placeholder='コメントを入力'
            className='w-80 rounded-lg border p-2'
            value={comment}
            onChange={onChangeComment}
            onKeyDown={(e) => e.metaKey && e.key === 'Enter' && onSubmit()}
            aria-describedby={helpId}
          />

          <button
            type='submit'
            aria-label='送信'
            disabled={isPosting}
            className='flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 p-2 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-300'
          >
            <span className='text-lg font-bold text-white'>送信</span>
            {hasPosted ? (
              <CheckIcon aria-hidden='true' color='white' className='h-6 w-6' />
            ) : (
              <PaperAirplaneIcon aria-hidden='true' color='white' className='h-6 w-6' />
            )}
          </button>

          <p id={helpId} className='flex items-center gap-1 text-xs'>
            <span className='rounded-md border border-slate-300 bg-slate-200 px-1 py-0.5 font-mono'>⌘+Enter</span>
            <span>or</span>
            <span className='rounded-md border border-slate-300 bg-slate-200 px-1 py-0.5 font-mono'>Ctrl+Enter</span>
          </p>
        </form>

        <p className='px-4'>このページはコメント送信専用で、他の人が投稿したコメントなどは表示されません</p>
      </div>
    </Layout>
  );
};
