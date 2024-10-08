"use client";

import { useEffect } from "react";
import { useDragDrop } from "./context/useDragDrop";

export default function DropBox() {
  const { droppedItem, setDroppedItem } = useDragDrop(); // 객체 구조 분해 할당으로 데이터 추출

  useEffect(() => {
    if (droppedItem) {
      console.log("Dropped Item:", droppedItem); // 드래그된 아이템이 있을 때만 로그 출력
    }
  }, [droppedItem]); // droppedItem이 변경될 때마다 useEffect 실행


  useEffect(()=>{
    setDroppedItem(null)
  },[])
  // 드래그 오버 시 호출될 함수
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 드롭을 허용하기 위해 기본 동작을 방지
  };

  // 드롭 시 호출될 함수
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("application/json");
    const item = JSON.parse(data);
    setDroppedItem(item); // 컨텍스트 프로바이더에 데이터 저장
  };

  return (
    <div
      className="flex justify-center items-center border-4 border-dashed w-5/6 h-2/3 rounded-2xl text-slate-200"
      onDrop={handleDrop} // 드롭 핸들러 설정
      onDragOver={handleDragOver} // 드래그 오버 핸들러 설정
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
