import { SignInModal } from './SignInModal/SignInModal';
import { pagesPath } from '@/lib/$path';
import { Link } from '@/components/Link/Link';
import { useUser } from '@/hooks/useUser';
import { auth } from '@/lib/firebase';
import logo from 'public/img/logo.png';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
      <header className='flex h-[104px] items-start justify-between p-8'>
        <Link href={pagesPath.$url()}>
          <span className='relative inline-block h-[38px] w-[248px]'>
            <Image src={logo} fill alt='Meetup Studio' />
          </span>
        </Link>

        {user === null ? (
          <button
            onClick={signInAndPrepareEvent}
            className='animate-appear-slow rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400'
          >
            サインイン
          </button>
        ) : user !== undefined ? (
          <button
            type='button'
            className='animate-appear-slow rounded border border-orange-500 bg-white py-2 px-4 font-bold text-orange-500 transition-colors hover:bg-gray-50 hover:text-orange-400'
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
            className='animate-appear-slow rounded bg-orange-500 py-4 px-6 text-xl font-bold text-white transition-colors hover:bg-orange-400'
          >
            {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
          </button>
        </div>
      </div>
      <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} navigateToApp={navigateToApp} />
    </>
  );
}
