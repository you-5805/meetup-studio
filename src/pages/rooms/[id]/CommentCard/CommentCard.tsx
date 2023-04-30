import { Avatar } from '../Avatar/Avatar';
import { firestore } from '@/lib/firebase';
import { convertComment } from '@/lib/convertComment';
import { getAgo } from '@/lib/formatDate';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import type { Comment } from '@/types/Comment';

type Props = {
  roomId: string;
};

export const CommentCard = ({ roomId }: Props) => {
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
    const card = commentCardRef.current;
    if (!card) return;

    // scroll-behavior: smooth; を解除して一番下までスクロール
    card.style.scrollBehavior = 'unset';
    scrollToBottom();
    card.style.scrollBehavior = 'smooth';

    setShowScrollToBottomButton(false);
    setShouldAutoScroll(true);
  };

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
  }, []);

  // shouldAutoScroll が false になったとき、0.5s で debounce してボタンを表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollToBottomButton(!shouldAutoScroll);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [shouldAutoScroll]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'roomsv2', roomId, 'comments'), orderBy('createdAt', 'asc')),
      (querySnapshot) => {
        const newComments = querySnapshot
          .docChanges()
          .filter((change) => change.type === 'added')
          .map((change) => convertComment(change.doc));
        setComments((prev) => [...prev, ...newComments]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return (
    <div className='relative'>
      <div
        ref={commentCardRef}
        className='relative flex h-[calc(100vh-72px)] flex-col gap-8 overflow-auto scroll-smooth rounded-lg bg-white p-4 shadow-lg'
      >
        {comments.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center gap-4 text-center leading-loose'>
            <p>コメント</p>
          </div>
        ) : (
          comments.map(({ id, author, content, createdAt }) => (
            <div key={id} className='flex flex-col items-start gap-1.5'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Avatar img={author.img} />

                  <span className='whitespace-nowrap'>{author.name}</span>
                </div>
                <time dateTime={createdAt} className='whitespace-nowrap text-right text-xs text-gray-400'>
                  {getAgo(createdAt)}
                </time>
              </div>
              <p className='whitespace-pre-wrap md:text-lg'>{content}</p>
            </div>
          ))
        )}
      </div>

      {showScrollToBottomButton && (
        <button
          type='button'
          className='absolute bottom-4 left-[calc(10%)] mx-auto flex h-10 w-4/5 items-center justify-center gap-4 rounded-xl bg-gray-200 bg-opacity-40 shadow-lg backdrop-blur-sm backdrop-filter'
          onClick={onClickScrollToBottomButton}
        >
          <span className='text-sm text-gray-600'>一番下までスクロール</span>
          <ArrowDownIcon className='h-3 w-3' />
        </button>
      )}

      {/* TODO impl */}
      {/* <button
        type='button'
        className='absolute top-0 -left-2 h-full w-4 bg-gray-300 opacity-40'
        aria-label='コメント欄を最小化'
      /> */}
    </div>
  );
};
