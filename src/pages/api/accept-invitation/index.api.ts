import { firestore } from '@/lib/firebaseAdmin';
import { convertRoom } from '@/lib/convertRoom';
import { z } from 'zod';
import type { Room } from '@/types/Room';
import type { InvitationTokenDocument } from '@/types/Invitation';
import type { NextApiHandler } from 'next';

const reqBodySchema = z.object({
  token: z.string(),
  user: z.object({
    name: z.string(),
    img: z.string().or(z.null()),
    uid: z.string(),
  }),
  roomId: z.string(),
});

const handler = (async (req, res) => {
  if (req.method !== 'POST') return res.status(403).json({ error: 'Method not allowed' });

  const parsed = reqBodySchema.safeParse(JSON.parse(req.body));
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const { token, user, roomId } = parsed.data;

  const tokenDoc = await firestore.collection('rooms').doc(roomId).collection('config').doc('token').get();
  if (!tokenDoc.exists) return res.status(500).json({ error: 'Internal' });

  const { value } = tokenDoc.data() as InvitationTokenDocument;
  if (token !== value) return res.status(401).json({ error: 'Invalid token' });

  const room = convertRoom(await firestore.collection('rooms').doc(roomId).get()) as Room;

  await firestore
    .collection('rooms')
    .doc(roomId)
    .update({
      cohostIds: [...room.cohostIds, user.uid],
      cohosts: [...room.cohosts, user],
    });

  res.end();
}) satisfies NextApiHandler;

export default handler;
