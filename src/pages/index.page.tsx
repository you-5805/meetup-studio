import { SignInModal } from './SignInModal/SignInModal';
import { Features } from './Features';
import { Layout } from '@/components/Layout/Layout';
import { useUser } from '@/hooks/useUser';
import { pagesPath } from '@/lib/$path';
import { isSignInModalOpenedState } from '@/states/global';
import cafe from 'public/img/cafe.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilCallback } from 'recoil';

export default function Page() {
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
    <Layout>
      <div className='flex flex-col gap-8 px-8 py-10 md:py-20'>
        <section className='mx-auto flex max-w-6xl flex-col items-center gap-8'>
          <div className='mx-auto grid grid-cols-1 gap-10 xl:grid-cols-2'>
            <h1 className='col-span-1 flex flex-col items-center justify-center text-2xl font-bold leading-normal tracking-tight md:text-4xl'>
              <span className='whitespace-nowrap leading-normal'>オフラインイベントを</span>
              <span className='whitespace-nowrap leading-normal'>もっとインタラクティブに</span>
            </h1>
            <div className='col-span-1'>
              <Image src={cafe} alt='カフェで人々が雑談している風景' />
            </div>
          </div>

          <button
            onClick={signInAndPrepareEvent}
            className='animate-appear-slow rounded bg-orange-500 px-4 py-4 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6'
          >
            {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
          </button>
        </section>

        <hr />

        <Features />

        <hr />

        <button
          onClick={signInAndPrepareEvent}
          className='animate-appear-slow rounded bg-orange-500 px-4 py-6 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6'
        >
          {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
        </button>
      </div>
      <SignInModal />
    </Layout>
  );
}
