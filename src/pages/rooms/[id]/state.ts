import { atom } from 'recoil';

export const isSettingModalOpenedState = atom<boolean>({
  key: 'isSettingModalOpenedState/2',
  default: false,
});
