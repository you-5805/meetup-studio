import { firestore } from '@/lib/firebase';
import { anonUserNameState } from '@/states/global';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import type { ChangeEventHandler } from 'react';
import type { User } from 'firebase/auth';

type Args = {
  roomId: string;
  user: User | null;
};

export const usePostComment = ({ roomId, user }: Args) => {
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const anonUserName = useRecoilValue(anonUserNameState);

  const onChangeComment = (({ target: { value } }) =>
    setComment(value)) satisfies ChangeEventHandler<HTMLTextAreaElement>;

  const onSubmit = async () => {
    if (comment === '') return;

    setIsPosting(true);
    try {
      await addDoc(collection(firestore, 'rooms', roomId, 'comments'), {
        content: comment,
        author: {
          id: user?.uid ?? null,
          name: user?.displayName ?? anonUserName,
          img: user?.photoURL ?? null,
        },
        createdAt: new Date(),
      });
      setComment('');
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました');
    } finally {
      setIsPosting(false);
      setHasPosted(true);
      setTimeout(() => setHasPosted(false), 500);
    }
  };

  return {
    comment,
    onChangeComment,
    isPosting,
    hasPosted,
    onSubmit,
  };
};
