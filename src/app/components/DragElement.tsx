"use client";

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useData } from "./hooks/context/useData";
import { useDragDrop } from "./hooks/context/useDragDrop";
import ImageItem from "./hooks/memo/useMemo.Image";
import { IMusicDataFormat } from "@/shared/IDataFormat";
import mime from "mime";

interface DragElementProps {
  footerRef: React.RefObject<HTMLDivElement>;
}

export default function DragElement({ footerRef }: DragElementProps) {
  const { data, loading } = useData();
  const { setDroppedItem } = useDragDrop();
  const [visibleCount, setVisibleCount] = useState(15);
  const [isMobile, setIsMobile] = useState(false);

  // 뷰포트 너비를 감지하여 모바일 환경 여부 설정
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 환경 기준 뷰포트 너비 설정
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 드래그 이벤트 핸들러 - 데스크탑 환경에서만 동작
  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => {
      if (!isMobile && event.target instanceof HTMLImageElement) {
        event.dataTransfer.setData(mime.getType("json")!, JSON.stringify(item));
      }
    },
    [isMobile]
  );

  // 모바일 환경에서의 클릭 이벤트 핸들러
  const handleClick = useCallback(
    (item: IMusicDataFormat) => {
      if (isMobile) {
        setDroppedItem(item); // 클릭 시 데이터를 설정
      }
    },
    [isMobile, setDroppedItem]
  );

  const handleScroll = useCallback(() => {
    if (footerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = footerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        setVisibleCount((prevCount) => prevCount + 10); // 10개씩 추가 로드
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

  // 이미지 목록 렌더링을 위한 useMemo
  const imageList = useMemo(() => {
    if (loading) return null;
    return data.slice(0, visibleCount).map((element, index) => (
      <ImageItem
        key={index}
        element={element}
        handleDragStart={(e) => handleDragStart(e, element)}
        onClick={() => handleClick(element)} // 모바일 환경에서 클릭 이벤트 설정
      />
    ));
  }, [data, visibleCount, handleDragStart, handleClick, loading]);

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