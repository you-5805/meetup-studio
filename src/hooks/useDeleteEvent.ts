import { pagesPath } from '@/lib/$path';
import { firestore } from '@/lib/firebase';
import { isSettingModalOpenedState } from '@/pages/app/room/[id]/state';
import { isScreenLoadingState } from '@/states/global';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

export const useDeleteEvent = (roomId: string) => {
  const router = useRouter();
  const setGlobalLoading = useSetRecoilState(isScreenLoadingState);
  const closeModal = useRecoilCallback(
    ({ set }) =>
      () =>
        set(isSettingModalOpenedState, false),
    []
  );

  const deleteEvent = async () => {
    if (
      confirm(
        'イベントを削除すると、メンバーやタイトル情報、これまでのコメントが削除され、URL や QR コードも無効になります。本当に削除しますか？'
      )
    ) {
      setGlobalLoading(true);
      await deleteDoc(doc(firestore, 'rooms', roomId));
      router.push(pagesPath.app.$url().pathname);
      closeModal();
      setGlobalLoading(false);
    }
  };

  return {
    deleteEvent,
  };
};
