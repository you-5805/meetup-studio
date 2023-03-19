import type { Timestamp } from 'firebase/firestore';

export type CommentDocument = {
  author: {
    id: string | null;
    name: string;
    img: string | null;
  };
  content: string;
  createdAt: Timestamp;
};

export type Comment = {
  [key in keyof CommentDocument]: CommentDocument[key] extends Timestamp ? string : CommentDocument[key];
} & { id: string };
