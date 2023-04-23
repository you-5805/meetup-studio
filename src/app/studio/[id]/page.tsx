import { convertRoom } from '@/lib/convertRoom';
import { firestore } from '@/lib/firebaseAdmin';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps) {
  const documentSnapshot = await firestore.collection('rooms').doc(id).get();
  if (!documentSnapshot.exists) notFound();

  const room = convertRoom(documentSnapshot);

  return <h1>{JSON.stringify(room)}</h1>;
}
