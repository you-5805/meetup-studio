import type { Timestamp } from 'firebase/firestore';

export type ReactionDocument = {
  author: {
    id: string | null;
    name: string;
    img: string | null;
  };
  content: string;
  createdAt: Timestamp;
};

export type Reaction = {
  [key in keyof ReactionDocument]: ReactionDocument[key] extends Timestamp ? string : ReactionDocument[key];
} & { id: string };
