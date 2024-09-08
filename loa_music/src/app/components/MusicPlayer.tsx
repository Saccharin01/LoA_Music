"use client"
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const volumeBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const updateTime = () => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
        if (progressBarRef.current) {
          progressBarRef.current.value = `${(audioElement.currentTime / audioElement.duration) * 100}`;
        }
      };

      audioElement.addEventListener('timeupdate', updateTime);
      audioElement.addEventListener('loadedmetadata', updateTime);

      return () => {
        audioElement.removeEventListener('timeupdate', updateTime);
        audioElement.removeEventListener('loadedmetadata', updateTime);
      };
    }
  }, []);

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
      audioElement.currentTime = (parseFloat(event.target.value) / 100) * audioElement.duration;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = parseFloat(event.target.value) / 100;
    }
  };

  return (
    <>
      <div className="w-[200px] h-[200px] mx-auto my-5 bg-center bg-cover rounded-full shadow-md transition-transform duration-500 ease-linear">
        <img src="https://lomusic2.s3.ap-northeast-2.amazonaws.com/LPImage2.png" alt="LP" className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="mt-2 text-gray-800 text-sm">
        <p className="font-bold text-base">MusicTitle</p>
        <p className="mt-1 font-mono">
          {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
        </p>
      </div>

      <audio
        ref={audioRef}
        src="https://lomusic2.s3.amazonaws.com/Star_Conquer%2CKamen.mp3"
      ></audio>

      <div className="mt-4 ">
        <button
          className="mx-2 px-4 py-2 text-lg border-none rounded bg-gray-800 text-white cursor-pointer w-[100px] transition-colors duration-300 ease-in-out hover:bg-yellow-500"
          onClick={() => { /* Previous button functionality */ }}
        > 
        </button>
        <button
          className="mx-2 px-4 py-2 text-lg border-none rounded bg-gray-800 text-white cursor-pointer w-[100px] transition-colors duration-300 ease-in-out hover:bg-yellow-500"
          onClick={handlePlayPause}
        >재생
        </button>
        <button
          className="mx-2 px-4 py-2 text-lg border-none rounded bg-gray-800 text-white cursor-pointer w-[100px] transition-colors duration-300 ease-in-out hover:bg-yellow-500"
          onClick={() => { /* Next button functionality */ }}
        >
        </button>
      </div>

      <div className="flex mt-4">
        <input
          type="range"
          className="w-full h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer"
          ref={progressBarRef}
          defaultValue="0"
          max="100"
          onChange={handleProgressChange}
        />
        <input
          type="range"
          className="w-1/2 h-[5px] bg-gray-300 rounded-lg appearance-none cursor-pointer ml-4"
          ref={volumeBarRef}
          defaultValue="100"
          max="100"
          onChange={handleVolumeChange}
        />
      </div>
    </>

  );
};

export default MusicPlayer;
