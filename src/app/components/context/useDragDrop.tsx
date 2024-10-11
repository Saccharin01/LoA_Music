"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IMusicDataFormat } from "@/shared/IDataFormat";

interface DragDropContextType {
  droppedItem: IMusicDataFormat | null;
  setDroppedItem: (items: IMusicDataFormat | null) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(
  undefined
);

interface DragDropProviderProps {
  children: ReactNode;
}

function DragDropProvider({ children }: DragDropProviderProps) {
  const [droppedItem, setDroppedItem] = useState<IMusicDataFormat | null>(null);

  return (
    <DragDropContext.Provider value={{ droppedItem, setDroppedItem }}>
      {children}
    </DragDropContext.Provider>
  );
}

function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}

export { DragDropProvider, useDragDrop };
