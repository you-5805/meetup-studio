import type { ReactionDocument } from '@/types/Reaction';
import type { DocumentSnapshot } from 'firebase/firestore';
import type { DocumentSnapshot as DocumentSnapshotAdmin } from 'firebase-admin/firestore';

export const convertReaction = (doc: DocumentSnapshot | DocumentSnapshotAdmin) => {
  const { createdAt, ...data } = doc.data() as ReactionDocument;
  return {
    ...data,
    id: doc.id,
    createdAt: createdAt.toDate().toISOString(),
  };
};
