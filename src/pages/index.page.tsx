import { SignInModal } from './SignInModal/SignInModal';
import { useUser } from '@/hooks/useUser';
import { pagesPath } from '@/lib/$path';
import { isSignInModalOpenedState } from '@/states/global';
import cafe from 'public/img/cafe.png';
import { Layout } from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const navigateToApp = () => router.push(pagesPath.app.$url().pathname);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useRecoilState(isSignInModalOpenedState);
  const signInAndPrepareEvent = () => {
    if (!user) {
      setIsOpen(true);
    } else {
      navigateToApp();
    }
  };

  return (
    <Layout>
      <div className='px-8 py-10 md:py-20'>
        <div className='mx-auto flex max-w-6xl flex-col items-center gap-8'>
          <div className='mx-auto grid grid-cols-1 gap-10 xl:grid-cols-2'>
            <h1 className='col-span-1 flex flex-col items-center justify-center text-2xl font-bold leading-normal tracking-tight md:text-4xl'>
              <span className='whitespace-nowrap leading-normal'>オフラインイベントを</span>
              <span className='whitespace-nowrap leading-normal'>もっとインタラクティブに</span>
            </h1>
            <div className='col-span-1'>
              <Image src={cafe} alt='' />
            </div>
          </div>

          <button
            onClick={signInAndPrepareEvent}
            className='animate-appear-slow rounded bg-orange-500 py-4 px-6 text-xl font-bold text-white transition-colors hover:bg-orange-400'
          >
            {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
          </button>
        </div>
      </div>
      <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} navigateToApp={navigateToApp} />
    </Layout>
  );
}
