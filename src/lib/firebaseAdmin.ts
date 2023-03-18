import { FIREBASE_PROJECT_ID } from '@/config/env';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from '@/config/serverEnv';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY,
  }),
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
