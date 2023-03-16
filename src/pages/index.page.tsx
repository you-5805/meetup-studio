import { useShareScreen } from '@/hooks/useShareScreen';

export default function Page() {
  const { videoRef, isSharing, startSharing, stopSharing } = useShareScreen();

  return (
    <>
      {isSharing ? (
        <button type='button' className='p-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg' onClick={stopSharing}>
          画面共有を停止する
        </button>
      ) : (
        <button
          type='button'
          className='p-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg'
          onClick={startSharing}
        >
          画面を共有する
        </button>
      )}
      <div className='mx-auto max-w-2xl'>
        <video ref={videoRef} autoPlay playsInline />
      </div>
    </>
  );
}
