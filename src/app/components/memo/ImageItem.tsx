import React from "react";
import Image from "next/image";
import { IMusicDataFormat } from "@/shared/IDataFormat";

interface ImageItemProps {
  element: IMusicDataFormat;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ element, handleDragStart }) => {
  return (
    <div
      className="flex justify-center items-center m-2 h-40 cursor-pointer w-80"
      draggable
      onDragStart={(event) => handleDragStart(event, element)}
    >
      <Image
        src={element.img}
        alt={element._id}
        className="h-full"
        width={300}
        height={160}
        loading="lazy"
      />
    </div>
  );
};

export default ImageItem;
