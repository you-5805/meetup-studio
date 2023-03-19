'use client';

import { CreateRoom } from './CreateRoom/CreateRoom';
import { Rooms } from './Rooms/Rooms';
import { Seo } from './seo';
import { SignInModal } from '../SignInModal/SignInModal';
import { useUser } from '@/hooks/useUser';
import { Layout } from '@/components/Layout/Layout';

export default function Page() {
  const { user } = useUser({ required: true });

  return (
    <>
      <Seo />
      <Layout>
        <div className='flex min-h-[calc(100vh-200px)] flex-col items-center gap-16 bg-gray-100 px-4 py-20'>
          <CreateRoom user={user} />

          <Rooms user={user} />
        </div>
      </Layout>
      <SignInModal />
    </>
  );
}
