import { IMusicDataFormat } from "@/shared/IDataFormat";

export interface ImageItemProps {
    element: IMusicDataFormat;
    handleDragStart: (event: React.DragEvent<HTMLDivElement>, element: IMusicDataFormat) => void;
    onClick: () => void; // onClick 속성을 선택적으로 추가
  }