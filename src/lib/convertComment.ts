import type { CommentDocument } from '@/types/Comment';
import type { DocumentSnapshot } from 'firebase/firestore';

export const convertComment = (comment: DocumentSnapshot) => {
  const { createdAt, ...data } = comment.data() as CommentDocument;

  return {
    id: comment.id,
    ...data,
    createdAt: createdAt.toDate().toISOString(),
  };
};
