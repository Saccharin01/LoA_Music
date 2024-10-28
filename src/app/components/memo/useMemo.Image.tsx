import React from "react";
import Image from "next/image";
import { ImageItemProps } from "../../../shared/interface/useMemo.interface";

const ImageItem: React.FC<ImageItemProps> = ({ element, handleDragStart }) => {
  return (
    <div
      className="flex justify-center items-center m-2 h-48 cursor-pointer w-80 rounded-md overflow-hidden transition-transform duration-200 hover:scale-105"
      draggable
      onDragStart={(event) => handleDragStart(event, element)}
    >
      <Image
        src={element.img}
        alt={element._id}
        className="object-cover"
        width={300}
        height={200}
        loading="lazy"
      />
    </div>
  );
};

export default ImageItem;
