"use client";

import { useEffect, useRef } from "react";
import { useData } from "./context/useData"; // 커스텀 훅 import
import DataFormat from "@/shared/IDataFromat";
import Image from "next/image";
export default function DragElement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const data = useData();

  // 드래그 시작 시 호출될 함수
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: DataFormat
  ) => {
    event.dataTransfer.setData("application/json", JSON.stringify(item)); // 데이터를 데이터 전송 객체에 저장
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-x-auto flex justify-start items-center transition-all duration-300 ease-in-out"
    >
      {data.map((element, index) => (
        <div
          key={index}
          className="min-w-60 m-3 h-40 flex justify-center items-center bg-indigo-400 cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, element)} // 드래그 시작 핸들러 설정
        >
          <img
            src={element.img}
            alt={element._id}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
