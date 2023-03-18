import { Studio } from './Studio/Studio';
import { getServerSideProps } from './index.server';
import { useUser } from '@/hooks/useUser';
import Head from 'next/head';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ room }: PageProps) {
  const { user } = useUser();

  if (user === undefined) {
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center gap-8'>
        <div className='h-16 w-16 animate-spin-slow rounded-xl bg-orange-300'></div>
        <p className='text-2xl text-orange-400'>loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{room.name} | Meetup Studio</title>
      </Head>
      {user === null ? <h1>参加者ページ todo: impl</h1> : <Studio />}
    </>
  );
}
