"use client";

import { useEffect, useRef } from "react";
import { useData } from "./context/useData"; // 커스텀 훅 import
import mongooseData from "../modules/MongooseData";
import DataFormat from "@/shared/IDataFromat";

export default function DragElement() {
  const data = useData();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const scrollEvent = (event: WheelEvent) => {
        event.preventDefault();

        let scrollAmount = event.deltaY;

        // deltaMode에 따라 스크롤 속도 조정
        if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
          scrollAmount *= 16; // 라인당 16px로 조정
        } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
          scrollAmount *= container.clientWidth; // 페이지 단위 스크롤
        }

        // 트랙패드인지 확인하여 스크롤 속도 조정 (MacOS)
        const isTrackpad = Math.abs(event.deltaY) < 100;

        if (isTrackpad) {
          scrollAmount *= 0.5; // 트랙패드 스크롤을 덜 민감하게
        } else {
          scrollAmount *= 1; // 마우스 휠의 경우 기본 속도 유지
        }

        container.scrollLeft += scrollAmount; // 가로 스크롤 적용
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

  return (
    <div
      ref={containerRef}
      className="w-full h-50 overflow-x-auto overflow-y-hidden whitespace-nowrap"
    >
      {data.map((element, index) => (
        <div
          key={index}
          className="inline-block min-w-60 m-3 h-40 justify-center items-center bg-indigo-400 cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, element)} // 드래그 시작 핸들러 설정
        >
          {element._id}
        </div>
      ))}
    </div>
  );
}
