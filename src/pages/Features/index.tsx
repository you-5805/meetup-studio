import serviceImg1 from 'public/img/service_1.png';
import serviceImg2 from 'public/img/service_2.png';
import serviceImg3 from 'public/img/service_3.png';
import Image from 'next/image';

export const Features = () => {
  return (
    <section className='grid gap-8'>
      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <h2 className='text-2xl font-bold sm:text-3xl'>Meetup Studio とは</h2>
          <p>
            Meetup
            Studioは、オフライン勉強会において、参加者や登壇者がより簡単にコミュニケーションを取れるようにするためのツールです。
          </p>
          <p>配信画面を投影し、表示されるQRコードを読み取れば、わずか数秒でセッションに参加が可能です。</p>
        </div>

        <div className='p-2 md:p-8'>
          <Image
            src={serviceImg1}
            alt='Meetup Studio での画面の様子。登壇資料と、左下に参加者用の QR コード、右側に参加者からのコメントと、画面全体に絵文字によるリアクションンが表示されている。'
            className='shadow-lg'
          />
        </div>
      </div>

      <hr />

      <div className='flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2'>
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
      </div>

      <hr />

      <div className='grid gap-8 lg:grid-cols-2'>
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
      </div>
    </section>
  );
};
