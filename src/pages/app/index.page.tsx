'use client';

import { CreateRoom } from './CreateRoom/CreateRoom';
import { Rooms } from './Rooms/Rooms';
import { Layout } from '@/components/Layout/Layout';
import { useUser } from '@/hooks/useUser';
import Head from 'next/head';

export default function Page() {
  const { user } = useUser({ required: true });

  return (
    <>
      <Head>
        <title>イベントの作成 | Meetup Studio</title>
      </Head>
      <Layout>
        <div className='flex min-h-[calc(100vh-200px)] flex-col items-center gap-16 bg-gray-100 px-4 py-20'>
          <CreateRoom user={user} />

          <Rooms user={user} />
        </div>
      </Layout>
    </>
  );
}
