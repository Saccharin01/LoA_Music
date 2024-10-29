import { useState, useRef, useEffect } from "react";

export function usePlayerState(initialVolume = 20) {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleProgressDrag = (event: React.MouseEvent | MouseEvent) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newLeft = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
      const newProgress = (newLeft / rect.width) * duration;

      if (audioRef.current) {
        audioRef.current.currentTime = newProgress;
        setCurrentTime(newProgress);
      }
    }
  };

  const startProgressDrag = (event: React.MouseEvent) => {
    handleProgressDrag(event);

    const mouseMoveHandler = (event: MouseEvent) => {
      handleProgressDrag(event);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = volume / 100;
      const updateTime = () => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("loadedmetadata", updateTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("loadedmetadata", updateTime);
      };
    }
  }, [volume]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,
    progressBarRef,
    handlePlayPause,
    handleVolumeChange,
    startProgressDrag,
    setCurrentTime,
    setDuration,
    setIsPlaying
  };
}
