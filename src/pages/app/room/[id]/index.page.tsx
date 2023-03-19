import { Studio } from './Studio/Studio';
import { getServerSideProps } from './index.server';
import { SettingModal } from './SettingModal/SettingModal';
import { Seo } from './seo';
import { FeedbackPanel } from './FeedbackPanel/FeedbackPanel';
import { useUser } from '@/hooks/useUser';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ room }: PageProps) {
  const { user } = useUser();

  if (user === undefined) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Seo eventTitle={room.name} />

      {user?.uid === room.owner.uid || (user && room.cohostIds.includes(user?.uid)) ? (
        <Studio room={room} />
      ) : (
        <FeedbackPanel room={room} user={user} />
      )}

      <SettingModal room={room} />
    </>
  );
}
