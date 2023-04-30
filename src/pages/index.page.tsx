import { SignInModal } from './SignInModal/SignInModal';
import { Features } from './Features';
import { Layout } from '@/components/Layout/Layout';
import { pagesPath } from '@/lib/$path';
import cafe from 'public/img/cafe.png';
import { firestore } from '@/lib/firebase';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [isButtonLoading, setisButtonLoading] = useState(false);
  const createAndMoveToRoom = async () => {
    setisButtonLoading(true);
    const localStorageRooms = JSON.parse(localStorage.getItem('roomIds') ?? '[]') as string[];

    const id = nanoid(8);
    localStorage.setItem('roomIds', JSON.stringify([...localStorageRooms, id]));
    try {
      await setDoc(doc(firestore, 'roomsv2', id), {
        id,
        title: '勉強会',
      });
      await router.push(pagesPath.rooms._id(id).$url());
    } finally {
      setisButtonLoading(false);
    }
  };

  return (
    <Layout>
      <div className='flex flex-col gap-8 px-8 py-10 md:py-20'>
        <section className='mx-auto flex max-w-6xl flex-col items-center gap-8'>
          <div className='mx-auto grid grid-cols-1 gap-10 xl:grid-cols-2'>
            <h1 className='col-span-1 flex flex-col items-center justify-center text-2xl font-bold leading-normal tracking-tight md:text-4xl'>
              <span className='whitespace-nowrap leading-normal'>オフラインイベントを</span>
              <span className='whitespace-nowrap leading-normal'>もっとインタラクティブに</span>
            </h1>
            <div className='col-span-1'>
              <Image src={cafe} alt='カフェで人々が雑談している風景のイラスト' />
            </div>
          </div>

          <button
            onClick={createAndMoveToRoom}
            className={cn(
              'animate-appear-slow rounded bg-orange-500 px-4 py-4 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6',
              {
                'cursor-not-allowed opacity-50': isButtonLoading,
              }
            )}
          >
            配信画面に移動する
          </button>
        </section>

        <hr />

        <Features />

        <hr />

        <button
          onClick={createAndMoveToRoom}
          className={cn(
            'curso animate-appear-slow rounded bg-orange-500 px-4 py-6 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6',
            {
              'cursor-not-allowed opacity-50': isButtonLoading,
            }
          )}
        >
          配信画面に移動する
        </button>
      </div>
      <SignInModal />
    </Layout>
  );
}
