import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { Room } from '@/types/Room';

type Args = {
  roomId: string;
};

export const useRoom = ({ roomId }: Args) => {
  const [room, setRoom] = useState<Room | null | 'loading'>('loading');

  useEffect(() => {
    getDoc(doc(firestore, 'rooms', roomId)).then((documentSnapshot) => {
      if (!documentSnapshot.exists()) {
        setRoom(null);
        return;
      }

      const data = documentSnapshot.data() as Room;
      setRoom(data);
    });
  }, [roomId]);

  return {
    room,
  };
};
