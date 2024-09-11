"use client"

import { useEffect } from "react"
import { useDragDrop } from "./context/useDragDrop"

export default function DropBox() {
  const { droppedItem, setDroppedItem } = useDragDrop(); // 객체 구조 분해 할당으로 데이터 추출

  useEffect(() => {
    if (droppedItem) {
      console.log('Dropped Item:', droppedItem); // 드래그된 아이템이 있을 때만 로그 출력
    }
  }, [droppedItem]); // droppedItem이 변경될 때마다 useEffect 실행

  return (
    <div className="flex justify-center items-center border-4 border-dashed w-2/3 h-2/3 rounded-2xl">
      Drag Here!
    </div>
  );
}
