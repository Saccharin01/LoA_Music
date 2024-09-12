"use client";

import { useEffect, useRef } from "react";
import { useData } from "./context/useData"; // 커스텀 훅 import
import mongooseData from "../modules/MongooseData";
import { useDragDrop } from "./context/useDragDrop";
import DataFormat from "@/shared/IDataFromat";

export default function DragElement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const data = useData();
  // const { setDroppedItem } = useDragDrop();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollEvent = (event: WheelEvent) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      };
      container.addEventListener("wheel", scrollEvent);

      return () => {
        container.removeEventListener("wheel", scrollEvent);
      };
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mongooseData();
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // 드래그 시작 시 호출될 함수
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: DataFormat) => {
    event.dataTransfer.setData('application/json', JSON.stringify(item)); // 데이터를 데이터 전송 객체에 저장
  };

  // // 드래그 오버 시 호출될 함수
  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault(); // 드롭을 허용하기 위해 기본 동작을 방지
  // };

  // // 드롭 시 호출될 함수
  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const data = event.dataTransfer.getData('application/json');
  //   const item = JSON.parse(data);
  //   setDroppedItem(item); // 컨텍스트 프로바이더에 데이터 저장
  // };

  return (
    <div
      ref={containerRef}
      className="w-full h-50 overflow-hidden flex justify-start items-cen ter transition-all duration-300 ease-in-out"
    >
      {data.map((element, index) => (
        <div
          key={index}
          className="min-w-60 m-3 h-40 flex justify-center items-center bg-indigo-400 cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, element)} // 드래그 시작 핸들러 설정
        >
          {element._id}
        </div>
      ))}
    </div>
  );
}
