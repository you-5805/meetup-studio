import { Studio } from './Studio/Studio';
import { getServerSideProps } from './index.server';
import { useUser } from '@/hooks/useUser';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import Head from 'next/head';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ room }: PageProps) {
  const { user } = useUser();

  if (user === undefined) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>{room.name} | Meetup Studio</title>
      </Head>
      {user === null ? <h1>参加者ページ todo: impl</h1> : <Studio />}
    </>
  );
}