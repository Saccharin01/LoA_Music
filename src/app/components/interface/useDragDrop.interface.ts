import { IMusicDataFormat } from "@/shared/IDataFormat";


export interface DragDropContextType {
  droppedItem: IMusicDataFormat | null;
  setDroppedItem: (items: IMusicDataFormat | null) => void;
}