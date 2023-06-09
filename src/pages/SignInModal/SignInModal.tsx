import { pagesPath } from '@/lib/$path';
import { auth, firestore } from '@/lib/firebase';
import { isScreenLoadingState, isSignInModalOpenedState } from '@/states/global';
import { XMarkIcon } from '@heroicons/react/24/solid';
import * as RadixDialog from '@radix-ui/react-dialog';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import type { AuthProvider, User } from 'firebase/auth';

const google = new GoogleAuthProvider();

type Props = {
  afterSignIn?: null | ((user: User) => void);
};

export const SignInModal = ({ afterSignIn }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(isSignInModalOpenedState);

  const setLoading = useSetRecoilState(isScreenLoadingState);

  const signIn = async (provider: AuthProvider) => {
    try {
      setLoading(true);
      const { user } = await signInWithPopup(auth, provider);
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        img: user.photoURL,
        email: user.email,
      });

      if (afterSignIn === null) return;
      if (afterSignIn === undefined) {
        router.push(pagesPath.app.$url().pathname);
      } else {
        afterSignIn(user);
      }
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        err.code === 'auth/account-exists-with-different-credential'
      ) {
        alert('別のSNSで既に登録しています。');
        return;
      }

      console.error(err);
      alert('エラーが発生しました。');
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed inset-0 animate-appear bg-black bg-opacity-30 data-[state=open]:animate-appear data-[state=closed]:animate-disappear' />
        <RadixDialog.Content className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6 shadow-xl'>
          <div className='flex min-w-[300px] items-start justify-between'>
            <RadixDialog.Title className='w-full text-center text-xl font-bold md:text-left'>
              サインイン
            </RadixDialog.Title>

            <RadixDialog.Close asChild>
              <button aria-label='モーダルを閉じる'>
                <XMarkIcon className='h-6 w-6 text-gray-600' aria-hidden='true' />
              </button>
            </RadixDialog.Close>
          </div>

          <RadixDialog.Description className='md:text-md text-sm'>
            イベントを開催するには SNS でのサインインが必要です。
          </RadixDialog.Description>
          <div className='flex flex-col items-center gap-4'>
            <button
              onClick={() => signIn(google)}
              className='flex w-full max-w-md items-center justify-center gap-3 rounded border border-gray-200 bg-white p-2 font-bold text-[#000000] shadow-md transition-colors hover:bg-gray-100'
            >
              <svg viewBox='0 0 533.5 544.3' width='18' height='18'>
                <title>google-colored</title>
                <path
                  d='M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z'
                  fill='#4285f4'
                ></path>
                <path
                  d='M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z'
                  fill='#34a853'
                ></path>
                <path
                  d='M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z'
                  fill='#fbbc04'
                ></path>
                <path
                  d='M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z'
                  fill='#ea4335'
                ></path>
              </svg>
              Login with Google
            </button>

            <p className='md:text-md text-xs'>
              <Link href={pagesPath.terms.$url()} className='text-gray-700 underline' target='_blank'>
                利用規約
              </Link>
              および
              <Link href={pagesPath.privacy_policy.$url()} className='text-gray-700 underline' target='_blank'>
                プライバシーポリシー
              </Link>
              に同意の上、サインインしてください。
            </p>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
