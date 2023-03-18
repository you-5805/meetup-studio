import { pagesPath } from '@/lib/$path';
import { Link } from '@/components/Link/Link';

export default function Page() {
  return (
    <>
      <h1>サービス説明</h1>
      <Link href={pagesPath.app.$url()}>App</Link>
    </>
  );
}
