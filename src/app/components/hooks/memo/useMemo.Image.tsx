import React from "react";
import Image from "next/image";
import { ImageItemProps } from "@/shared/interface/useMemo.interface";

const ImageItem: React.FC<ImageItemProps> = ({ element, handleDragStart }) => {
  return (
    <div
      className="flex justify-center items-center cursor-pointer w-full max-w-full h-auto rounded-md overflow-hidden transition-transform duration-200 hover:scale-105"
      draggable
      onDragStart={(event) => handleDragStart(event, element)}
    >
      <Image
        src={element.img}
        alt={element._id}
        className="object-cover w-full h-full"
        width={300}
        height={200}
        sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, 25vw"
        priority 
      />
    </div>
  );
};

export default ImageItem;
