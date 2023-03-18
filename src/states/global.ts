import { atom } from 'recoil';

export const isSignInModalOpenedState = atom<boolean>({
  key: 'isSignInModalOpenedState',
  default: false,
});
