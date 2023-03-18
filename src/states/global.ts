import { atom } from 'recoil';

export const isSignInModalOpenedState = atom<boolean>({
  key: 'isSignInModalOpenedState',
  default: false,
});

export const isScreenLoadingState = atom<boolean>({
  key: 'isScreenLoadingState',
  default: false,
});
