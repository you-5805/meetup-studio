import { LoadingScreen } from '../LoadingScreen';
import { pagesPath } from '@/lib/$path';
import logo from 'public/img/logo.png';
import { isScreenLoadingState } from '@/states/global';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const router = useRouter();

  const isScreenLoading = useRecoilValue(isScreenLoadingState);
  if (isScreenLoading) return <LoadingScreen />;

  return (
    <>
      <header className='flex h-[80px] items-center justify-between px-4 md:px-8'>
        <Link href={pagesPath.$url()}>
          <span className='relative inline-block h-[24px] w-[149px] md:h-[38px] md:w-[248px]'>
            <Image src={logo} fill alt='Meetup Studio' />
          </span>
        </Link>
      </header>
      <main className='min-h-[calc(100vh-200px)]'>{children}</main>
      <footer className='flex flex-col items-center gap-4 bg-gray-200 px-3 pb-20 pt-8'>
        <div className='flex flex-wrap items-center justify-center gap-6'>
          <Link href={pagesPath.terms.$url()}>
            <span className='whitespace-nowrap hover:text-gray-600 hover:underline'>利用規約</span>
          </Link>
          <Link href={pagesPath.privacy_policy.$url()}>
            <span className='whitespace-nowrap hover:text-gray-600 hover:underline'>プライバシーポリシー</span>
          </Link>
          <a
            href='https://twitter.com/yoiwamoto'
            target='_blank'
            rel='noreferrer'
            className='whitespace-nowrap hover:text-gray-600 hover:underline'
          >
            開発者Twitter
          </a>
        </div>

        {router.pathname === '/' && (
          <p>
            <a href='https://www.freepik.com/free-vector/coffee-shop-concept-illustration_15588818.htm#query=meetup&position=8&from_view=search&track=sph'>
              Image by storyset
            </a>
            on Freepik
          </p>
        )}
      </footer>
    </>
  );
};
