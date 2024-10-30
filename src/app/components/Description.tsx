"use client";

import { useDragDrop } from "./hooks/context/useDragDrop";
import GenreNav from "./GenreNav";

export default function MusicDescription() {
  const { droppedItem } = useDragDrop();
  if (!droppedItem || !droppedItem.description) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 rounded-lg h-full justify-between">
        <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center">
          <GenreNav />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">불러온 내용이 없어요</h2>
          <p className="text-lg text-gray-700">위 버튼을 클릭하면 노래를 불러올 수 있어요!</p>
        </div>
      </div>
    );
  }

  const { headLine, mainScript } = droppedItem.description;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg h-full">
      <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center">
        <GenreNav />
      </div>
      <div
        className={`bg-gray-100 p-4 rounded-lg shadow-md ${
          headLine && mainScript ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">{headLine}</h2>
        <p className="text-sm text-gray-700">{mainScript}</p>
      </div>
    </div>
  );
}