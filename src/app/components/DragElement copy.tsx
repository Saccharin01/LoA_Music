"use client";
import Image from "next/image";
import { useData } from "./context/useData";
import DataFormat from "@/shared/IDataFromat";

export default function DragElement() {
  const { data, loading } = useData();

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: DataFormat
  ) => {
    if (event.target instanceof HTMLImageElement)
      event.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <div className="w-full h-full overflow-x-hidden hide-scrollbar">
      <div className="grid grid-cols-5 gap-2 place-items-center overflow-auto">
        {data.map((element, index) => (
          <div
            key={index}
            className="flex justify-center items-center m-2 h-40 cursor-pointer w-80"
            draggable
            onDragStart={(event) => handleDragStart(event, element)}
          >
            <Image
              src={element.img}
              alt={element._id}
              className="h-full"
              width={320} // 이미지의 가로 크기 설정
              height={160} // 이미지의 세로 크기 설정
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
