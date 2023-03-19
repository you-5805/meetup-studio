import { firestore } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import type { InvitationTokenDocument } from '@/types/Invitation';

export const useInvitation = (roomId: string) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const invitationUrl = useMemo(() => {
    if (!token) return token;

    return `${new URL(location.href).origin}/app/room/${roomId}/invitation?token=${token}`;
  }, [roomId, token]);
  const copyUrl = () => {
    if (!invitationUrl) return;

    navigator.clipboard.writeText(invitationUrl);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 500);
  };

  const docRef = useMemo(() => doc(collection(firestore, 'rooms', roomId, 'config'), 'token'), [roomId]);

  useEffect(() => {
    getDoc(docRef).then(async (snapshot) => {
      if (snapshot.exists()) {
        setToken((snapshot.data() as InvitationTokenDocument).value);
      } else {
        const newToken = nanoid(80);
        await setDoc(docRef, { value: newToken });
        setToken(newToken);
      }
    });
  }, [docRef]);

  const deleteInvitation = async () => {
    setIsDeleting(true);
    try {
      deleteDoc(docRef);
      setIsDeleting(false);
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    invitationUrl,
    deleteInvitation,
    isDeleting,
    hasCopied,
    copyUrl,
  };
};
