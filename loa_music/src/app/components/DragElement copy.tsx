"use client";

import { useEffect, useRef } from "react";
import { useData } from "./context/useData copy"; // 커스텀 훅 import
import mongooseData from "../modules/MongooseData"

export default function DragElement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const data = useData(); // 커스텀 훅 사용

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

  return (
    <div
      ref={containerRef}
      className="w-full h-50 overflow-x-auto flex justify-start items-center transition-all duration-300 ease-in-out"
    >
      {data.map((element, index) => (
        <div
          key={index}
          className="min-w-60 m-3 h-40 flex justify-center items-center bg-indigo-400 cursor-pointer"
          draggable
          onDragStart={()=>{console.log("draging!")}}
        >
          {element._id}
        </div>
      ))}
    </div>
  );
}
