export const LoadingScreen = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center gap-8'>
      <div className='h-16 w-16 animate-spin-slow rounded-xl bg-orange-300'></div>
      <p className='text-2xl text-orange-400'>loading...</p>
    </div>
  );
};
