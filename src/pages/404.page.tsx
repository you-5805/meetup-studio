import { Layout } from '@/components/Layout/Layout';
import { pagesPath } from '@/lib/$path';
import Link from 'next/link';

export default function Page() {
  return (
    <Layout>
      <div className='fixed inset-0 flex flex-col items-center justify-center gap-4 text-center'>
        <h1 className='text-3xl font-bold'>404 Not Found...</h1>
        <p className='text-lg'>
          ページが見つかりませんでした🤔
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
    </Layout>
  );
}
