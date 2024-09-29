"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDragDrop } from "./context/useDragDrop";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(20); // 볼륨 상태 추가
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const volumeBarRef = useRef<HTMLInputElement | null>(null);
  const { droppedItem } = useDragDrop();

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = volume / 100; // 초기 볼륨 설정
      const updateTime = () => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
        if (progressBarRef.current) {
          progressBarRef.current.value = `${
            (audioElement.currentTime / audioElement.duration) * 100
          }`;
        }
      };

      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("loadedmetadata", updateTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("loadedmetadata", updateTime);
      };
    }
  }, [volume]); // 볼륨이 변경될 때마다 적용

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

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime =
        (parseFloat(event.target.value) / 100) * audioElement.duration;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume); // 볼륨 상태 업데이트
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100; // 오디오 요소의 볼륨 설정
    }
  };

  return (
    <div className="flex flex-col h-full justify-evenly bg-[#9e9e9e] bg-opacity-50 m-[10px]"> 
      <div className="w-[200px] h-[200px] mx-auto my-5 bg-center bg-cover rounded-full shadow-md transition-transform duration-500 ease-linear">
        <img
          src="https://lomusic2.s3.ap-northeast-2.amazonaws.com/LPImage2.png"
          alt="LP"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="mt-2 text-gray-800 text-sm flex justify-center items-center flex-col">
        <h3 className="font-black text-base">
          {droppedItem ? droppedItem._id : "재생중인 음악 없음!"}
        </h3>
        <p className="mt-1 font-mono">
          {`${
            droppedItem && !isNaN(currentTime) && !isNaN(duration)
              ? `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")} / ${Math.floor(
                  duration / 60
                )}:${Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}`
              : "0:00 / 0:00"
          }`}
        </p>
      </div>

      <audio ref={audioRef} src={droppedItem?.src}></audio>

      <div className="mt-4 px-4">
        <input
          type="range"
          className="w-full h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer"
          ref={progressBarRef}
          value={currentTime && duration ? (currentTime / duration) * 100 : 0}
          max="100"
          onChange={handleProgressChange}
        />
      </div>

      <div className="mt-4 flex justify-evenly items-center">
        <input
          type="range"
          className="w-60 h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer ml-4"
          ref={volumeBarRef}
          value={volume} // 상태로 관리되는 볼륨 값 사용
          max="100"
          onChange={handleVolumeChange}
        />

        <button
          className="mx-2 px-4 py-2 text-lg border-none rounded bg-gray-800 text-white min-w-[110px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-500"
          onClick={handlePlayPause}
        >
          {isPlaying && droppedItem ? "일시정지" : "재생"}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
