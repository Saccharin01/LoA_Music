"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDragDrop } from "./context/useDragDrop";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(20);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const volumeBarRef = useRef<HTMLInputElement | null>(null);
  const { droppedItem } = useDragDrop();

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

  useEffect(() => {
    setIsPlaying(false);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [droppedItem]);

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

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const startDragButton = (event: React.MouseEvent) => {
    event.preventDefault();
    const mouseMoveHandler = (event: MouseEvent) => {
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

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  };

  return (
    <div className="flex flex-col h-4/5 min-h-[95%] justify-between bg-[#9e9e9e] bg-opacity-40 p-5 rounded-lg shadow-lg m-5">
      {/* Album Image Section */}
      <div className="w-[200px] h-[200px] mx-auto my-5 bg-center bg-cover rounded-full shadow-md transition-transform duration-500 ease-linear">
        <img
          src="https://lomusic2.s3.ap-northeast-2.amazonaws.com/LPImage2.png"
          alt="LP"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Track Info Section */}
      <div className="text-center my-4">
        <h3 className="font-bold text-lg text-gray-800">
          {droppedItem ? droppedItem._id : "재생중인 음악 없음!"}
        </h3>
        <p className="mt-1 text-sm text-gray-700">
          {droppedItem && !isNaN(currentTime) && !isNaN(duration)
            ? `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")} / ${Math.floor(duration / 60)}:${Math.floor(
                duration % 60
              )
                .toString()
                .padStart(2, "0")}`
            : "0:00 / 0:00"}
        </p>
      </div>

      {/* Audio Player */}
      <audio ref={audioRef} src={droppedItem?.src}></audio>

      {/* Progress Bar Section */}
      <div className="mt-2 px-4" ref={progressBarRef} onMouseDown={startProgressDrag}>
        <div className="w-full h-[10px] bg-gray-300 rounded-lg relative overflow-hidden cursor-pointer">
          <div
            className="h-full bg-red-500 absolute top-0 left-0"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>

          {/* Draggable Button */}
          <div
            className="w-4 h-4 bg-white border border-gray-400 rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer transition-transform duration-300"
            style={{ left: `${(currentTime / duration) * 100}%` }}
            onMouseDown={startDragButton}
          ></div>
        </div>
      </div>

      {/* Volume and Control Section */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col items-center w-1/2">
          <input
            type="range"
            className="w-full h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer"
            ref={volumeBarRef}
            value={volume}
            max="100"
            onChange={handleVolumeChange}
          />
          <span className="text-xs text-gray-800 mt-1">Volume: {volume}%</span>
        </div>

        <button
          className="px-4 py-2 text-lg border-none rounded bg-gray-800 text-white min-w-[110px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-500"
          onClick={handlePlayPause}
        >
          {isPlaying && droppedItem ? "일시정지" : "재생"}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
