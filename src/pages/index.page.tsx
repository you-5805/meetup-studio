import { SignInModal } from './SignInModal/SignInModal';
import { Layout } from '@/components/Layout/Layout';
import { useUser } from '@/hooks/useUser';
import { pagesPath } from '@/lib/$path';
import { isSignInModalOpenedState } from '@/states/global';
import cafe from 'public/img/cafe.png';
import serviceImg1 from 'public/img/service_1.png';
import serviceImg2 from 'public/img/service_2.png';
import serviceImg3 from 'public/img/service_3.png';
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
            className='animate-appear-slow rounded bg-orange-500 py-4 px-4 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6'
          >
            {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
          </button>
        </section>

        <hr />

        <section className='grid gap-8 lg:grid-cols-2'>
          <div className='flex flex-col items-start justify-center gap-4'>
            <h2 className='text-2xl font-bold sm:text-3xl'>Meetup Studio とは</h2>
            <p>
              Meetup
              Studioは、オフライン勉強会において、参加者や登壇者がより簡単にコミュニケーションを取れるようにするためのツールです。QRコードを読み取るだけで、わずか数秒で参加が可能です。
            </p>
          </div>

          <div className='p-2 md:p-8'>
            <Image
              src={serviceImg1}
              alt='Meetup Studio での画面の様子。登壇資料と、左下に参加者用の QR コード、右側に参加者からのコメントと、画面全体に絵文字によるリアクションンが表示されている。'
              className='shadow-lg'
            />
          </div>
        </section>

        <hr />

        <section className='flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2'>
          <div className='flex justify-center p-2 md:p-8'>
            <Image
              src={serviceImg2}
              alt='参加者の操作画面。タイトル、コメントの入力フォーム、絵文字でのリアクション UI のみが表示されている。絵文字はメジャーなものが9つあり、肌の色が関わるものは調整機能がある。'
              width={200}
              className='shadow-lg'
            />
          </div>

          <div className='flex flex-col items-start justify-center gap-4'>
            <h2 className='text-2xl font-bold sm:text-3xl'>スマホで簡単にリアクション</h2>
            <p>
              従来のオフライン勉強会では、登壇者が話している間は聞くだけになりがちでした。しかし、Meetup
              Studioを使えば参加者がカジュアルにインタラクションを取ることができます。質問や感想を投げかけることが難しい場合でも、コメントなら簡単に参加できます。
            </p>
            <p>
              また、操作画面は極力要素を削ってシンプルに設計されています。参加者の集中は登壇者やスクリーンのまま、オフラインイベントをより盛り上げましょう。
            </p>
          </div>
        </section>

        <hr />

        <section className='grid gap-8 lg:grid-cols-2'>
          <div className='flex flex-col items-start justify-center gap-4'>
            <h2 className='text-2xl font-bold sm:text-3xl'>複数人での管理が可能</h2>
            <p>イベントを運営するチームメンバーを管理者に招待できます。</p>
          </div>

          <div className='flex justify-center p-2 md:p-8'>
            <Image
              src={serviceImg3}
              alt='イベントの設定モーダル画面。タイトルにイベントの設定とあり、運営メンバー（2人）が表示されている。招待用 URL がコピーできるようになっている。'
              width={360}
              className='shadow-lg'
            />
          </div>
        </section>

        <hr />

        <button
          onClick={signInAndPrepareEvent}
          className='animate-appear-slow rounded bg-orange-500 py-6 px-4 text-xl font-bold text-white transition-colors hover:bg-orange-400 md:px-6'
        >
          {user === null ? 'サインインしてイベントを準備' : 'イベントを準備する'}
        </button>
      </div>
      <SignInModal />
    </Layout>
  );
}
