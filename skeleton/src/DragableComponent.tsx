import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Item {
  id: string;
  content: string;
}

interface DraggableItemProps {
  item: Item;
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: 'none',
          padding: 16,
          margin: '0 0 8px 0',
          minHeight: '50px',
          backgroundColor: 'lightgrey',
          ...provided.draggableProps.style
        }}
      >
        {item.content}
      </div>
    )}
  </Draggable>
);

export default DraggableItem;
