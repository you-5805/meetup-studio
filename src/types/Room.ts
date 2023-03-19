import type { Timestamp } from 'firebase/firestore';

type User = {
  name: string;
  uid: string;
  img: string | null;
};

export type RoomDocument = {
  id: string;
  name: string;
  owner: User;
  cohostIds: string[];
  cohosts: User[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Room = {
  [key in keyof RoomDocument]: RoomDocument[key] extends Timestamp ? string : RoomDocument[key];
};
