import { commentsMock } from '@/mocks/comments';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import type { Comment } from '@/mocks/comments';

const randomComment = () => ({
  ...commentsMock[Math.floor(Math.random() * commentsMock.length)],
  id: nanoid(),
});

export const CommentCard = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const commentCardRef = useRef<HTMLDivElement>(null);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  const scrollToBottom = () => {
    const card = commentCardRef.current;
    if (!card) return;

    card.scrollTop = card.scrollHeight - card.clientHeight;
  };

  const onClickScrollToBottomButton = () => {
    scrollToBottom();
    setShowScrollToBottomButton(false);
    setShouldAutoScroll(true);
  };

  // TODO: websocket でコメントを受け取るよう更新
  useEffect(() => {
    const timer = setInterval(() => setComments((prev) => [...prev, randomComment()]), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // comments が追加されるたびに自動で下までスクロール
  useEffect(() => {
    if (!shouldAutoScroll) return;

    scrollToBottom();
  }, [comments, shouldAutoScroll]);

  // 一番下までスクロールした際、自動スクロールを許可
  useEffect(() => {
    const card = commentCardRef.current;
    if (!card) return;

    const handleScroll = () => {
      if (card.scrollTop + card.clientHeight === card.scrollHeight) {
        setShouldAutoScroll(true);
      } else {
        setShouldAutoScroll(false);
      }
    };

    card.addEventListener('scroll', handleScroll);

    return () => {
      card.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (shouldAutoScroll) setShowScrollToBottomButton(false);
    const timer = setTimeout(() => {
      if (shouldAutoScroll) return;
      setShowScrollToBottomButton(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [shouldAutoScroll]);

  return (
    <div className='relative'>
      <div
        ref={commentCardRef}
        className='relative flex h-[calc(100vh-80px)] flex-col gap-4 overflow-auto scroll-smooth rounded-lg bg-white p-4 shadow-lg'
      >
        {comments.map(({ id, comment, commentedAt, username, img }) => (
          <div key={id} className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Tooltip label={username}>
                <Image height={20} width={20} src={img} alt='' className='rounded-full' />
              </Tooltip>
              <p className='text-sm md:text-lg'>{comment}</p>
            </div>
            <time dateTime={commentedAt} className='text-xs text-gray-400'>
              {commentedAt}
            </time>
          </div>
        ))}
      </div>

      {showScrollToBottomButton && (
        <button
          type='button'
          className='absolute bottom-4 left-[calc(10%)] mx-auto flex h-10 w-4/5 items-center justify-center gap-4 rounded-xl bg-gray-200 bg-opacity-40 shadow-lg backdrop-blur-sm backdrop-filter'
          onClick={onClickScrollToBottomButton}
        >
          <span>一番下までスクロール</span>
          <ArrowDownIcon className='h-3 w-3' />
        </button>
      )}
    </div>
  );
};
