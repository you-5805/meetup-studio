'use client';

import { useState } from 'react';
import type { FormEventHandler } from 'react';

export default function Page() {
  const [roomName, setRoomName] = useState<string>('');

  const onSubmit = (async (e) => {
    e.preventDefault();
  }) satisfies FormEventHandler;

  return (
    <div className='sticky inset-0 flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='mx-auto w-80 rounded-lg bg-white p-4 shadow-lg'>
        <form onSubmit={onSubmit} className='flex flex-col gap-8'>
          <h1 className='text-center text-xl font-bold'>部屋の作成</h1>

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
            className='rounded bg-orange-500 py-2 px-4 font-bold text-white transition-colors hover:bg-orange-600'
          >
            部屋を作る
          </button>
        </form>
      </div>
    </div>
  );
}
