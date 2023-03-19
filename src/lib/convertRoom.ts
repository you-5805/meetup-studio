import type { RoomDocument } from '@/types/Room';
import type { DocumentSnapshot } from 'firebase/firestore';
import type { DocumentSnapshot as DocumentSnapshotAdmin } from 'firebase-admin/firestore';

export const convertRoom = (doc: DocumentSnapshot | DocumentSnapshotAdmin) => {
  const { createdAt, updatedAt, ...data } = doc.data() as RoomDocument;
  return {
    ...data,
    createdAt: createdAt.toDate().toISOString(),
    updatedAt: updatedAt.toDate().toISOString(),
  };
};
