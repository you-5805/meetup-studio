import { pagesPath } from '@/lib/$path';
import { Link } from '@/components/Link/Link';
import { auth } from '@/lib/firebase';
import logo from 'public/img/logo.png';
import { useUser } from '@/hooks/useUser';
import { isSignInModalOpenedState } from '@/states/global';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilCallback } from 'recoil';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const navigateToApp = () => router.push(pagesPath.app.$url().pathname);
  const { user } = useUser();
  const openSignInModal = useRecoilCallback(
    ({ set }) =>
      () =>
        set(isSignInModalOpenedState, true),
    []
  );
  const signInAndPrepareEvent = () => {
    if (!user) {
      openSignInModal();
    } else {
      navigateToApp();
    }
  };

  return (
    <>
      <header className='flex h-[80px] items-center justify-between px-4 md:px-8'>
        <Link href={pagesPath.$url()}>
          <span className='relative inline-block h-[24px] w-[149px] md:h-[38px] md:w-[248px]'>
            <Image src={logo} fill alt='Meetup Studio' />
          </span>
        </Link>

        {user === null ? (
          <button
            onClick={signInAndPrepareEvent}
            className='md:text-md animate-appear-slow rounded bg-orange-500 py-1.5 px-2 text-sm font-bold text-white transition-colors hover:bg-orange-400 md:py-2 md:px-4'
          >
            サインイン
          </button>
        ) : user !== undefined ? (
          <button
            type='button'
            className='md:text-md animate-appear-slow rounded border border-orange-500 bg-white py-1.5 px-2 text-sm font-bold text-orange-500 transition-colors hover:bg-gray-50 hover:text-orange-400 md:py-2 md:px-4'
            onClick={() => signOut(auth)}
          >
            サインアウト
          </button>
        ) : null}
      </header>
      <main className='min-h-screen'>{children}</main>
      <footer className='flex flex-col items-center gap-4 bg-gray-200 py-10'>
        <div className='flex items-center justify-center gap-8'>
          <Link href={pagesPath.terms.$url()}>
            <span className='hover:text-gray-600 hover:underline'>利用規約</span>
          </Link>
          <a
            href='https://twitter.com/yoiwamoto'
            target='_blank'
            rel='noreferrer'
            className='hover:text-gray-600 hover:underline'
          >
            開発者Twitter
          </a>
        </div>

        <p>
          <a href='https://www.freepik.com/free-vector/coffee-shop-concept-illustration_15588818.htm#query=meetup&position=8&from_view=search&track=sph'>
            Image by storyset
          </a>
          on Freepik
        </p>
      </footer>
    </>
  );
};
