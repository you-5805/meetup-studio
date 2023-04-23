import { firestore } from '@/lib/firebase';
import { convertReaction } from '@/lib/convertReaction';
import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import type { Reaction } from '@/types/Reaction';

type Props = {
  roomId: string;
};

export const ReactionField = ({ roomId }: Props) => {
  const initialized = useRef(false);

  const [reactions, setReactions] = useState<
    (Reaction & {
      position: string;
      duration: string;
    })[]
  >([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'roomsv2', roomId, 'reactions'), (querySnapshot) => {
      if (!initialized.current) {
        initialized.current = true;
        return;
      }

      const newReactions = querySnapshot
        .docChanges()
        .filter((change) => change.type === 'added')
        .map((change) => convertReaction(change.doc))
        .map((r) => ({
          ...r,
          position: `${Math.random() * 90}vw`,
          duration: `${Math.random() * 2 + 1}s`,
        }));
      setReactions((prev) => [...prev, ...newReactions]);
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const remove = (id: string) => {
    setReactions((prevState) => prevState.filter((reaction) => reaction.id !== id));
  };

  return (
    <>
      {reactions.map(({ id, content, position, duration }) => (
        <div
          key={id}
          className='reaction absolute bottom-0 z-10 animate-slidein text-6xl xl:text-7xl'
          style={{
            left: position,
            animationFillMode: 'forwards',
            animationDuration: duration,
            animationTimingFunction: 'linear',
          }}
          onAnimationEnd={() => remove(id)}
        >
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      ))}
    </>
  );
};
