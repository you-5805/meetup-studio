import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const usePathparameter = (key: string) => {
  const router = useRouter();

  const [parameter, setParameter] = useState<string | null>(null);

  useEffect(() => {
    const value = router.query[key];
    if (typeof value !== 'string') return;

    setParameter(value);
  }, [key, router.query]);

  return parameter;
};
