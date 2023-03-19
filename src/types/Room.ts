import type { Timestamp } from 'firebase/firestore';

export type RoomDocument = {
  id: string;
  name: string;
  owner: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Room = {
  [key in keyof RoomDocument]: RoomDocument[key] extends Timestamp ? string : RoomDocument[key];
};
