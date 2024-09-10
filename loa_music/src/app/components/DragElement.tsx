"use client";

import { useEffect, useRef } from "react";
// import mongooseData from "../modules/MongooseData"



export default function DragElement() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollEvent = (event: WheelEvent) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY
      };
      container.addEventListener("wheel", scrollEvent);

      return () => {
        container.removeEventListener("wheel", scrollEvent);
      };
    }
  }, []);

  // useEffect(()=>{
  //   const data2 = mongooseData()
  //   console.log(data2)
  // },[])


  // todo context provider 생성해야 함
  // todo axios 혹은 fetch로 데이터베이스에 정보 조회 가능해야 함. spa + 장난감이기 때문에 서버 안 만들거임
  // todo 데이터베이스에 정보 조회를 위해 mongoose 설치 해야 할 것 같음.
  

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
 
  return (
    <div
      ref={containerRef}
      className="w-full h-50 overflow-x-auto flex justify-start items-center transition-all duration-300 ease-in-out"
    >
      {data.map((element, index) => (
        <div
          key={index}
          className="min-w-60 m-3 h-40 flex justify-center items-center bg-indigo-400 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onDragStart={(e)=>{console.log(1111)}}
          draggable
        >
          {element}
        </div>
      ))}
    </div>
  );
}
