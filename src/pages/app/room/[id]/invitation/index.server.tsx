import { firestore } from '@/lib/firebaseAdmin';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// 実際の検証は cohosts を更新する /accept-invitation API で行っている。
// ここの notFound の処理は単にユーザービリティ向上のため
export const getServerSideProps = (async ({ params, query }) => {
  const token = query.token;
  const roomId = params?.id;
  // URL が不正な場合 notFound
  if (typeof token !== 'string' || typeof roomId !== 'string') return { notFound: true };

  const tokenDocument = await firestore.collection('rooms').doc(roomId).collection('config').doc('token').get();
  // トークンが存在しない場合 notFound
  if (!tokenDocument.exists) return { notFound: true };

  const { value } = tokenDocument.data() as { value: string };
  // トークンが誤っている場合 notFound
  if (token !== value) return { notFound: true };

  return {
    props: {},
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
