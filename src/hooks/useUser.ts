import { auth } from '@/lib/firebase';
import { pagesPath } from '@/lib/$path';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { User } from 'firebase/auth';

type Options = {
  required?: boolean;
};

export const useUser = ({ required = false }: Options = { required: false }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user === null && required) {
        router.push(pagesPath.$url().pathname);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [required, router]);

  return {
    user,
  };
};
