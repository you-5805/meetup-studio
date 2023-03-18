import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

export const useUser = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return {
    user,
  };
};
