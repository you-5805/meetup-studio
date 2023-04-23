import { anonUserNameState } from '@/states/global';
import { firestore } from '@/lib/firebase';
import { useRecoilValue } from 'recoil';
import { addDoc, collection } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export const usePostReaction = (roomId: string, user?: User | null) => {
  const anonUserName = useRecoilValue(anonUserNameState);

  const postReaction = (emoji: string) => {
    addDoc(collection(firestore, 'roomsv2', roomId, 'reactions'), {
      content: emoji,
      author: {
        id: user?.uid ?? null,
        name: user?.displayName ?? anonUserName,
        img: user?.photoURL ?? null,
      },
      createdAt: new Date(),
    });
  };

  return {
    postReaction,
  };
};
