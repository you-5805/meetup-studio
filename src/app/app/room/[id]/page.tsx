'use client';

import { Studio } from './Studio/Studio';
import { useUser } from '@/hooks/useUser';
import { useRoom } from '@/hooks/useEvent';
import { pagesPath } from '@/lib/$path';
import Link from 'next/link';
import Head from 'next/head';

type Params = { id: string };

export default function Page({ params }: { params: Params }) {
  const { user } = useUser();
  const { room } = useRoom({ roomId: params.id });

  if (user === undefined || room === 'loading') {
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center gap-8'>
        <div className='h-16 w-16 animate-spin-slow rounded-xl bg-orange-300'></div>
        <p className='text-2xl text-orange-400'>loading...</p>
      </div>
    );
  }

  if (room === null) {
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center gap-4 text-center'>
        <h1 className='text-3xl font-bold'>404 Not Found...</h1>
        <p className='text-lg'>
          イベントが見つかりませんでした🤔
          <br />
          URL や QR コードをお確かめください。
        </p>

        <Link
          href={pagesPath.$url()}
          className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400'
        >
          トップページへ戻る
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>test</title>
      </Head>
      {user === null ? <h1>参加者ページ todo: impl</h1> : <Studio />}
    </>
  );
}
