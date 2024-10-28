"use client";
import React, { useState } from "react";
import { useData } from "./context/useData";

const genres = ["commander", "adventure", "orb", "island", "abyss"];

const GenreNav: React.FC = () => {
  const { setData, loading, error } = useData(); // useData 훅에서 setData 가져오기
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchGenreData = async (genre: string) => {
    setFetchLoading(true);
    setFetchError(null);

    try {
      const response = await fetch(`/api/musicData?genre=${genre}`);
      if (!response.ok) throw new Error("Failed to fetch genre data");
      const data = await response.json();
      setData(data); // 데이터 업데이트
    } catch (error) {
      setFetchError((error as Error).message);
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4 px-2">
      <nav className="flex flex-wrap gap-2 sm:gap-4 justify-center">
        {genres.map((genre, index) => (
          <button
            key={index}
            value={genre}
            onClick={() => fetchGenreData(genre)}
            className="px-3 py-2 sm:px-4 sm:py-2 border border-black rounded-md bg-white hover:bg-gray-200 cursor-pointer shadow-md transition-all text-sm sm:text-base"
          >
            {genre}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default GenreNav;
