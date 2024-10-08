"use client";
import React, { useState } from 'react';
import { useData } from './context/useData';

const genres = ['commander', 'orb', 'island', 'abyss'];

const GenreNav: React.FC = () => {
  const { setData, loading, error } = useData(); // useData 훅에서 setData 가져오기
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchGenreData = async (genre: string) => {
    setFetchLoading(true);
    setFetchError(null);

    try {
      console.log("장르 네브 트라이 블록")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/musicData?genre=${genre}`);;
      if (!response.ok) throw new Error('Failed to fetch genre data');
      const data = await response.json();
      setData(data); // 데이터 업데이트
    } catch (error) {
      setFetchError((error as Error).message);
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <nav className="flex space-x-4">
        {genres.map((genre, index) => (
          <button
            key={index}
            value={genre}
            onClick={() => fetchGenreData(genre)}
            className="px-4 py-2 border border-black rounded-md bg-white hover:bg-gray-200 cursor-pointer shadow-md transition-all"
          >
            {genre}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default GenreNav;
