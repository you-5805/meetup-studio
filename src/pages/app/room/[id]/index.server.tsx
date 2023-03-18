import { firestore } from '@/lib/firebaseAdmin';
import type { Room } from '@/types/Room';
import type { GetServerSideProps, InferGetStaticPropsType } from 'next';

export const getServerSideProps = (async ({ query }) => {
  const roomId = query.id;
  if (typeof roomId !== 'string') return { notFound: true };

  const documentSnapshot = await firestore.collection('rooms').doc(roomId).get();
  if (!documentSnapshot.exists) return { notFound: true };

  const room = documentSnapshot.data() as Room;

  return {
    props: {
      room,
    },
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetStaticPropsType<typeof getServerSideProps>;
