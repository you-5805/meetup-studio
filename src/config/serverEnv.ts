export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL as string;
export const FIREBASE_PRIVATE_KEY = (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n');
