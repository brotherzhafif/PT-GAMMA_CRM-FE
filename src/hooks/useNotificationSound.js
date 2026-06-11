import { useCallback, useEffect, useRef } from "react";

export function useNotificationSound(soundSrc) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!soundSrc) {
      audioRef.current = null;
      return;
    }

    audioRef.current = new Audio(soundSrc);
    audioRef.current.preload = "auto";
  }, [soundSrc]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Browsers can block audio until the user has interacted with the page.
    });
  }, []);

  return { play };
}
