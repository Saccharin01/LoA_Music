"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import DataFormat from '@/shared/IDataFromat';

interface DragDropContextType {
  droppedItem : DataFormat | null
  setDroppedItem: (items: DataFormat | null) => void
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

interface DragDropProviderProps {
  children: ReactNode;
}

function DragDropProvider({ children }: DragDropProviderProps) {
  const [droppedItem, setDroppedItem] = useState<DataFormat | null>(null);

  return (
    <DragDropContext.Provider value={{ droppedItem, setDroppedItem }}>
      {children}
    </DragDropContext.Provider>
  );
}

function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

export { DragDropProvider, useDragDrop };
