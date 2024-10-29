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

  // * 페이징 관련 상태 값. 10개씩 불러오고 footerRef 매개변수를 통해 전달되는 props를 이용해 관측합니다.
  const [visibleCount, setVisibleCount] = useState(10);

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => {
      if (event.target instanceof HTMLImageElement)
        event.dataTransfer.setData(mime.getType("json")!, JSON.stringify(item));
    },
    []
  );

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

  /**
   * * 각 이미지가 리랜더링 되는 부분을 방지하기 위한 Memo 함수입니다
   * * 의존성 배열로 정의되어있는 data, VisibleCount 등의 값이 변경되지 않는 한 리랜더링을 진행하지 않습니다
   */
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
    return null;
  }

  return (
    <div
      className="grid gap-2 place-items-center bg-[#9e9e9e] bg-opacity-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 hide-scrollbar"
    >
      {imageList}
    </div>
  );
}
