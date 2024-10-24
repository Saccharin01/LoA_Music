import React from "react";
import Image from "next/image";
import {ImageItemProps} from "../../../shared/interface/useMemo.interface"

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
