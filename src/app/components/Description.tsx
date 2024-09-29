"use client";

import { useDragDrop } from "./context/useDragDrop";

export default function MusicDescription() {
  const { droppedItem } = useDragDrop();

  if (!droppedItem || !droppedItem.description) {
    return <div className="p-4">No dropped item available.</div>;
  }

  const { headLine, mainScript } = droppedItem.description;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md h-[90%] mt-[px]">
      <div className="bg-orange-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">{headLine}</h2>
        <p className="text-sm text-gray-700">{mainScript}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p>some Tag will here</p>
      </div>
    </div>
  );
}
