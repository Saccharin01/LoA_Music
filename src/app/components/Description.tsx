"use client";

import { useDragDrop } from "./hooks/context/useDragDrop";
import GenreNav from "./GenreNav";

export default function MusicDescription() {
  const { droppedItem } = useDragDrop();
  if (!droppedItem || !droppedItem.description) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md h-[90%] mt-[px]">
        <div className="bg-orange-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">불러온 내용이 없어요</h2>
          <p className="text-sm text-gray-700">아래의 버튼을 이용해서 장르를 선택 해주세요</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
          <GenreNav />
        </div>
      </div>
    );
  }

  const { headLine, mainScript } = droppedItem.description;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md h-[90%] mt-[px]">
      <div
        className={`bg-orange-100 p-4 rounded-lg shadow-md ${
          headLine && mainScript ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">{headLine}</h2>
        <p className="text-sm text-gray-700">{mainScript}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
        <GenreNav />
      </div>
    </div>
  );
}