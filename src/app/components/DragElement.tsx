"use client";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useData } from "./hooks/context/useData";
import ImageItem from "./hooks/memo/useMemo.Image";
import { IMusicDataFormat } from "@/shared/IDataFormat";
import mime from "mime";

export default function DragElement() {
  const { data, loading } = useData();
  const [visibleCount, setVisibleCount] = useState(20); // 표시할 데이터 개수

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => {
      if (event.target instanceof HTMLImageElement)
        event.dataTransfer.setData(mime.getType("json")!, JSON.stringify(item));
    },
    []
  );

  // 스크롤 이벤트 핸들러: 하단 근접 시 더 많은 항목을 로드
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      setVisibleCount((prevCount) => prevCount + 20); // 20개씩 추가 로드
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 초기 20개만 보여주고 추가 로딩
  const imageList = useMemo(
    () =>
      data.slice(0, visibleCount).map((element, index) => (
        <ImageItem
          key={index}
          element={element}
          handleDragStart={handleDragStart}
        />
      )),
    [data, visibleCount, handleDragStart]
  );

  if (!loading) {
    return (
      <div className="w-full h-full overflow-hidden">
        <div
          className="grid gap-2 place-items-center bg-[#9e9e9e] bg-opacity-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 hide-scrollbar overflow-hidden"
        >
          {imageList}
        </div>
      </div>
    );
  }

  return null; // 로딩 중일 때는 빈 화면을 반환
}
