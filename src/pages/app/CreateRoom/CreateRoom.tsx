import { firestore } from '@/lib/firebase';
import { Button } from '@/components/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from 'firebase/auth';

const formSchema = z.object({
  roomName: z.string().min(1).max(32, { message: 'イベントタイトルは32文字以内で入力してください。' }),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  user: User | null | undefined;
};

export const CreateRoom = ({ user }: Props) => {
  const router = useRouter();
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema), mode: 'onChange' });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async ({ roomName }) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const roomId = nanoid();

      await setDoc(doc(firestore, 'rooms', roomId), {
        id: roomId,
        name: roomName,
        owner: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      router.push(`/app/room/${roomId}`);
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。');
      setIsLoading(false);
    }
  });

  const errorId = useId();

  return (
    <div className='mx-auto w-80 rounded-lg bg-white p-4 shadow-lg md:w-96'>
      <form onSubmit={onSubmit} className='flex flex-col gap-8'>
        <h1 className='text-center text-xl font-bold'>イベントの作成</h1>

        <label className='flex flex-col gap-1'>
          <span className='font-bold'>タイトル</span>
          <input
            type='text'
            className='rounded-lg border p-2 font-bold'
            aria-errormessage={errorId}
            {...register('roomName')}
          />
          {errors.roomName !== undefined && errors.roomName?.type !== 'too_small' ? (
            <span className='text-sm font-bold text-red-500' id={errorId}>
              {errors.roomName?.message}
            </span>
          ) : null}
        </label>

        <Button type='submit' disabled={isLoading || !isValid}>
          {isLoading ? '作成中...' : '作成'}
        </Button>
      </form>
    </div>
  );
};
