"use client";

import { useEffect } from "react";
import { useDragDrop } from "./hooks/context/useDragDrop";
import Image from "next/image";

export default function DropBox() {
  const { droppedItem, setDroppedItem } = useDragDrop();

  useEffect(() => {
    if (droppedItem) {
      console.log("Dropped Item:", droppedItem);
    }
  }, [droppedItem]);

  useEffect(() => {
    setDroppedItem(null);
  }, [setDroppedItem]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("application/json");
    if (data) {
      const parsedData = JSON.parse(data);
      setDroppedItem(parsedData);
    }
  };

  return (
    <div
      className="flex justify-center items-center border-2 border-dashed w-5/6 h-2/3 min-w-[300px] min-h-[200px] rounded-2xl text-slate-200 mt-2"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {droppedItem?.img ? (
        <Image
          src={droppedItem.img}
          alt={droppedItem._id}
          className="object-cover rounded-lg"
          width={300}
          height={200}
          loading="lazy"
        />
      ) : (
        "Drop Here!"
      )}
    </div>
  );
}
