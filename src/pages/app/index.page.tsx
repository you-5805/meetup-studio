'use client';

import { useUser } from '@/hooks/useUser';
import { firestore } from '@/lib/firebase';
import { Layout } from '@/components/Layout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import Head from 'next/head';
import type { FormEventHandler } from 'react';

export default function Page() {
  const router = useRouter();

  const { user } = useUser({ required: true });

  const [roomName, setRoomName] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const roomId = nanoid();

      await setDoc(doc(firestore, 'rooms', roomId), { id: roomId, name: roomName, owner: user.uid });
      router.push(`/app/room/${roomId}`);
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。');
      setIsLoading(false);
    }
  }) satisfies FormEventHandler;

  return (
    <>
      <Head>
        <title>イベントの作成 | Meetup Studio</title>
      </Head>
      <Layout>
        <div className='sticky inset-0 flex min-h-screen items-center justify-center bg-gray-100 p-4'>
          <div className='mx-auto w-80 rounded-lg bg-white p-4 shadow-lg'>
            <form onSubmit={onSubmit} className='flex flex-col gap-8'>
              <h1 className='text-center text-xl font-bold'>イベントの作成</h1>

              <label className='flex flex-col gap-1'>
                <span className='font-bold'>イベント名</span>
                <input
                  type='text'
                  value={roomName}
                  onChange={({ target: { value } }) => setRoomName(value)}
                  className='rounded-lg border p-2 font-bold'
                />
              </label>

              <button
                type='submit'
                className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-400 disabled:bg-orange-300'
                disabled={isLoading || roomName === ''}
              >
                {isLoading ? '作成中...' : '作成'}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
