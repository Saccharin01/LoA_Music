"use client";
import React, { useMemo, useCallback } from "react";
import { useData } from "./context/useData";
import ImageItem from "./memo/useMemo.Image";
import { IMusicDataFormat } from "@/shared/IDataFormat";
import mime from "mime"
export default function DragElement() {
  const { data, loading } = useData();

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => {
      if (event.target instanceof HTMLImageElement)
        event.dataTransfer.setData(mime.getType("json")!, JSON.stringify(item));
    },
    []
  );

  const imageList = useMemo(
    () =>
      data.map((element, index) => (
        <ImageItem
          key={index}
          element={element}
          handleDragStart={handleDragStart}
        />
      )),
    [data, handleDragStart]
  );

  if (!loading) {
    return (
    <div className="w-full h-full overflow-x-hidden hide-scrollbar">
      <div className="grid grid-cols-5 gap-2 place-items-center overflow-auto">
        {imageList}
      </div>
    </div>
    )
  }

}
