import { useRooms } from '@/hooks/useRooms';
import { pagesPath } from '@/lib/$path';
import { getAgo } from '@/lib/formatDate';
import { isScreenLoadingState } from '@/states/global';
import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import type { User } from 'firebase/auth';

type Props = {
  user: User | null | undefined;
};

export const Rooms = ({ user }: Props) => {
  const router = useRouter();
  const { rooms } = useRooms({ user });
  const setIsLoading = useSetRecoilState(isScreenLoadingState);

  const onClickRoomLink = () => setIsLoading(true);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router.events, setIsLoading]);

  if (!rooms?.length) return null;

  return (
    <section className='flex flex-col items-center gap-8'>
      <h2 className='text-xl font-bold'>運営メンバーになっているイベント</h2>
      <div className='flex max-w-4xl flex-wrap justify-center gap-6'>
        {rooms.map((room) => (
          <article key={room.id}>
            <Link
              href={pagesPath.app.room._id(room.id).$url()}
              className='relative flex w-96 flex-col items-start gap-6 rounded-lg bg-white py-3 px-4 shadow-lg transition-all hover:bg-gray-50 hover:shadow-md'
              onClick={onClickRoomLink}
            >
              {room.owner.uid !== user?.uid ? (
                <div className='absolute right-4 top-3 rounded-lg border border-orange-500 p-1 px-2 text-xs text-orange-500'>
                  招待
                </div>
              ) : null}

              <p className='text-lg font-bold'>{room.name}</p>
              <div>
                <p className='flex items-center gap-1 text-xs'>
                  <ClockIcon color='#6b7280' className='h-3 w-3' />
                  <span>作成:</span>
                  <time dateTime={room.createdAt}>{getAgo(room.createdAt)}</time>
                </p>
                <p className='flex items-center gap-1 text-xs'>
                  <ClockIcon color='#6b7280' className='h-3 w-3' />
                  <span>更新:</span>
                  <time dateTime={room.createdAt}>{getAgo(room.createdAt)}</time>
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
