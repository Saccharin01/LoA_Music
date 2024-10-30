"use client";
import React from "react";
import { useDragDrop } from "./hooks/context/useDragDrop";
import Image from "next/image";
import { usePlayerState } from "./hooks/usePlayerState";

const MusicPlayer: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,
    progressBarRef,
    handlePlayPause,
    handleVolumeChange,
    startProgressDrag,
    setIsPlaying,
  } = usePlayerState(20);

  const { droppedItem } = useDragDrop();

  React.useEffect(() => {
    setIsPlaying(false);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [droppedItem, setIsPlaying, audioRef]);

  return (
    <div className="flex flex-col w-full justify-between bg-[#9e9e9e] bg-opacity-40 p-5 rounded-lg shadow-lg h-[40rem]">
      <div className="w-[200px] h-[200px] mx-auto my-5 bg-center bg-cover rounded-full shadow-md transition-transform duration-500 ease-linear">
        <Image
          src="https://lomusic2.s3.ap-northeast-2.amazonaws.com/LPImage2.webp"
          alt="LP image"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-full"
          priority
        />
      </div>

      <div className="text-center my-4">
        <h3 className="font-bold text-lg text-black">
          {droppedItem ? droppedItem._id : "재생중인 음악 없음!"}
        </h3>
        <p className="mt-1 text-sm text-black">
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

      <audio ref={audioRef} src={droppedItem?.src}></audio>

      <div className="mt-2 px-4" ref={progressBarRef} onMouseDown={startProgressDrag}>
        <div className="w-full h-[10px] bg-gray-300 rounded-lg relative overflow-hidden cursor-pointer">
          <div
            className="h-full bg-red-500 absolute top-0 left-0"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>

          <div
            className="w-4 h-4 bg-white border border-gray-400 rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer transition-transform duration-300"
            style={{ left: `${(currentTime / duration) * 100}%` }}
            onMouseDown={startProgressDrag}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col items-center w-1/2">
          <input
            type="range"
            className="w-full h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
