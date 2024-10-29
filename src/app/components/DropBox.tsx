"use client";

import { useEffect } from "react";
import { useDragDrop } from "./hooks/context/useDragDrop";

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
      className="flex justify-center items-center border-4 border-dashed w-5/6 h-2/3 rounded-2xl text-slate-200"
      onDrop={handleDrop} 
      onDragOver={handleDragOver} 
    >
      {droppedItem?.img ? (
        <img
          src={droppedItem.img}
          alt={droppedItem._id}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      ) : (
        "Drop Here!"
      )}
    </div>
  );
}
