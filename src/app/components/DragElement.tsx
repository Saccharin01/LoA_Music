"use client";

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useData } from "./hooks/context/useData";
import ImageItem from "./hooks/memo/useMemo.Image";
import { IMusicDataFormat } from "@/shared/IDataFormat";
import mime from "mime";

interface DragElementProps {
  footerRef: React.RefObject<HTMLDivElement>;
}

export default function DragElement({ footerRef }: DragElementProps) {
  const { data, loading } = useData();
  const [visibleCount, setVisibleCount] = useState(10); // 표시할 데이터 개수

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => {
      if (event.target instanceof HTMLImageElement)
        event.dataTransfer.setData(mime.getType("json")!, JSON.stringify(item));
    },
    []
  );

  // footer 내 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (footerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = footerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        setVisibleCount((prevCount) => prevCount + 10); // 20개씩 추가 로드
      }
    }
  }, [footerRef]);

  useEffect(() => {
    if (!loading) {
      const footerElement = footerRef.current;
      if (footerElement) {
        footerElement.addEventListener("scroll", handleScroll);
      }
      return () => {
        if (footerElement) {
          footerElement.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [handleScroll, footerRef, loading]);

  const imageList = useMemo(() => {
    if (loading) return null;
    return data.slice(0, visibleCount).map((element, index) => (
      <ImageItem
        key={index}
        element={element}
        handleDragStart={handleDragStart}
      />
    ));
  }, [data, visibleCount, handleDragStart, loading]);

  if (loading) {
    return null; // 로딩 중일 때는 빈 화면을 반환
  }

  return (
    <div
      className="grid gap-2 place-items-center bg-[#9e9e9e] bg-opacity-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 hide-scrollbar"
    >
      {imageList}
    </div>
  );
}
