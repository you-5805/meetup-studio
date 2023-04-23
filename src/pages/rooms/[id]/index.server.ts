import { firestore } from '@/lib/firebaseAdmin';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query }) => {
  const { id } = query;
  if (typeof id !== 'string') return { notFound: true };

  const roomDoc = await firestore.collection('roomsv2').doc(id).get();
  const room = roomDoc.data();
  if (room === undefined) return { notFound: true };

  return {
    props: {
      room: room as {
        id: string;
        title: string;
      },
    },
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
