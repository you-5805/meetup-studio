import { firestore } from '@/lib/firebase';
import { convertRoom } from '@/lib/convertRoom';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { Room } from '@/types/Room';

type Options = {
  user: User | null | undefined;
};

export const useRooms = ({ user }: Options) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (!user) return;

    getDocs(query(collection(firestore, 'rooms'), where('owner', '==', user.uid))).then((querySnapshot) => {
      const data = querySnapshot.docs.map(convertRoom);
      setRooms(data);
    });
  }, [user]);

  return {
    rooms,
  };
};
