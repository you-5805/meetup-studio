import { useRef, useState } from 'react';

export const useDisplayScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamState, setStreamState] = useState<MediaStream | null>(null);
  const isDisplaying = streamState !== null;

  const startDisplaying = () => {
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

  const stopDisplaying = () => {
    if (!streamState) return;

    streamState.getTracks().forEach((track) => track.stop());
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = null;
    setStreamState(null);
  };

  return {
    videoRef,
    isDisplaying,
    startDisplaying,
    stopDisplaying,
  };
};
