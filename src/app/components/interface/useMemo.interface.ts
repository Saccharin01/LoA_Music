import { IMusicDataFormat } from "@/shared/IDataFormat";

export interface ImageItemProps {
  element: IMusicDataFormat;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, item: IMusicDataFormat) => void;
}