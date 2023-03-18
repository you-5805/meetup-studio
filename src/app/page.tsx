'use client';

import { SignInModal } from './SignInModal/SignInModal';
import { pagesPath } from '@/lib/$path';
import { Link } from '@/components/Link/Link';
import { useUser } from '@/hooks/useUser';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const navigateToApp = () => router.push(pagesPath.app.$url().pathname);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const signInAndPrepareEvent = () => {
    if (!user) {
      setIsOpen(true);
    } else {
      navigateToApp();
    }
  };

  return (
    <>
      <header className='flex h-[104px] items-center justify-between p-8'>
        <p className='font-mono text-2xl font-bold'>
          <Link href={pagesPath.$url()}>Meetup Studio</Link>
        </p>

        {user === null ? (
          <button
            onClick={signInAndPrepareEvent}
            className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400'
          >
            サインイン
          </button>
        ) : user !== undefined ? (
          <button
            type='button'
            className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400'
            onClick={() => signOut(auth)}
          >
            サインアウト
          </button>
        ) : null}
      </header>
      <div className='px-8 py-20'>
        <div className='mx-auto flex max-w-6xl flex-col items-start gap-8'>
          <h1 className='text-5xl font-bold leading-normal tracking-tight'>
            <span className='whitespace-nowrap'>オフラインイベントを</span>
            <span className='whitespace-nowrap'>もっとインタラクティブに</span>
          </h1>
          <button
            onClick={signInAndPrepareEvent}
            className='rounded bg-orange-500 py-4 px-6 text-xl font-bold text-white transition-colors hover:bg-orange-400'
          >
            サインインしてイベントを準備
          </button>
        </div>
      </div>
      <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} navigateToApp={navigateToApp} />
    </>
  );
}
