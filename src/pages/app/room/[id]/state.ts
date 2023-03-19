import { atom } from 'recoil';

export const isSettingModalOpenedState = atom<boolean>({
  key: 'isSettingModalOpenedState',
  default: false,
});
