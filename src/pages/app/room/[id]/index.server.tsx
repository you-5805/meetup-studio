import { convertRoom } from '@/lib/convertRoom';
import { firestore } from '@/lib/firebaseAdmin';
import type { GetServerSideProps, InferGetStaticPropsType } from 'next';

export const getServerSideProps = (async ({ query }) => {
  const roomId = query.id;
  if (typeof roomId !== 'string') return { notFound: true };

  const documentSnapshot = await firestore.collection('rooms').doc(roomId).get();
  if (!documentSnapshot.exists) return { notFound: true };

  const room = convertRoom(documentSnapshot);

  return {
    props: {
      room,
    },
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetStaticPropsType<typeof getServerSideProps>;
