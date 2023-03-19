import { getServerSideProps } from './index.server';
import { Layout } from '@/components/Layout/Layout';
import { SignInModal } from '@/pages/SignInModal/SignInModal';
import { Button } from '@/components/Button/Button';
import { isSignInModalOpenedState } from '@/states/global';
import { useRoom } from '@/hooks/useRoom';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { useRecoilCallback } from 'recoil';
import { useRouter } from 'next/router';
import type { User } from 'firebase/auth';

export { getServerSideProps };

export default function Page() {
  const router = useRouter();

  const { room } = useRoom();

  const afterSignIn = async (user: User) => {
    if (room === null || room === 'loading') return;
    const token = new URL(location.href).searchParams.get('token');
    if (typeof token !== 'string') return;

    try {
      const res = await fetch('/api/accept-invitation', {
        method: 'POST',
        body: JSON.stringify({
          token,
          user: {
            uid: user.uid,
            name: user.displayName ?? '',
            img: user.photoURL,
          },
          roomId: room.id,
        }),
      });
      if (!res.ok) throw new Error('failed /accept-invitation', { cause: res });

      router.push(`/app/room/${room.id}`);
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました');
    }
  };

  const openSignInModal = useRecoilCallback(
    ({ set }) =>
      () =>
        set(isSignInModalOpenedState, true),
    []
  );

  return (
    <Layout>
      {room === null || room === 'loading' ? (
        <LoadingScreen />
      ) : (
        <div className='flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-4 px-3 text-center'>
          <h1 className='text-2xl font-bold'>
            <span className='inline-block'>{room.name}の運営メンバーに</span>
            <span className='inline-block'>招待されています。</span>
          </h1>
          <p>参加すると、イベントの設定や、配信画面の表示等を行うことができます。</p>

          <Button onClick={openSignInModal}>参加する</Button>
        </div>
      )}

      <SignInModal afterSignIn={afterSignIn} />
    </Layout>
  );
}
