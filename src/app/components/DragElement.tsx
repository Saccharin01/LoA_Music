"use client";

import { useRef } from "react";
import { useData } from "./context/useData";
import DataFormat from "@/shared/IDataFromat";

export default function DragElement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useData();

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: DataFormat
  ) => {
    event.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-x-auto flex flex-col justify-start items-center"
    >
      <div className="overflow-x-auto flex flex-wrap m-3 p-3 border border-gray-200 bg-gray-100 justify-around">
        {data.map((element, index) => (
          <div
            key={index}
            className="min-w-60 m-2 h-40 flex justify-center items-center bg-indigo-400 cursor-pointer"
            draggable
            onDragStart={(event) => handleDragStart(event, element)}
          >
            <img src={element.img} alt={element._id} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
