import { nanoid } from 'nanoid';
import { atom } from 'recoil';

export const isSignInModalOpenedState = atom<boolean>({
  key: 'isSignInModalOpenedState',
  default: false,
});

export const isScreenLoadingState = atom<boolean>({
  key: 'isScreenLoadingState',
  default: false,
});

export const anonUserNameState = atom<string>({
  key: 'anonUserNameState',
  default: `user_${nanoid(4)}`,
});

const getRandomColorCode = () => {
  let colorCode = '#';
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 16).toString(16);
    colorCode += randomDigit;
  }
  return colorCode;
};

export const anonUserBgColorState = atom<string>({
  key: 'anonUserBgColorState',
  default: getRandomColorCode(),
});
