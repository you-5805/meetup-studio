import { getServerSideProps } from './index.server';
import { Seo } from './seo';
import { Studio } from './Studio/Studio';
import { SettingModal } from './SettingModal/SettingModal';
import { FeedbackPanel } from './FeedbackPanel/FeedbackPanel';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ room }: PageProps) {
  const [isOwner, setIsOwner] = useState<boolean | undefined>(undefined);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('roomIds') ?? '[]') as string[];
    setIsOwner(ids.includes(room.id));
  }, [room.id]);

  const { user } = useUser();

  if (isOwner === undefined || user === undefined) return <LoadingScreen />;

  return (
    <>
      <Seo eventTitle={room.title} />
      {isOwner ? (
        <>
          <Studio room={room} />
          <SettingModal isOpen={isSettingModalOpen} setIsOpen={setIsSettingModalOpen} />
        </>
      ) : (
        <FeedbackPanel room={room} user={user} />
      )}
    </>
  );
}
