import { useRef, useState } from 'react';

export const useShareScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamState, setStreamState] = useState<MediaStream | null>(null);
  const isSharing = streamState !== null;

  const startSharing = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      setStreamState(stream);
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;

      stream.addEventListener('inactive', () => {
        video.srcObject = null;
        setStreamState(null);
      });
    });
  };

  const stopSharing = () => {
    if (!streamState) return;

    streamState.getTracks().forEach((track) => track.stop());
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = null;
    setStreamState(null);
  };

  return {
    videoRef,
    isSharing,
    startSharing,
    stopSharing,
  };
};
