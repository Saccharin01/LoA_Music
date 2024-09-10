import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableItem from './DragableComponent';

interface Item {
  id: string;
  content: string;
}

const initialItemsLeft: Item[] = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' }
];

const initialItemsRight: Item[] = [
  { id: '4', content: 'Item 4' },
  { id: '5', content: 'Item 5' }
];

export default function DragableContainer() {
  const [itemsLeft, setItemsLeft] = useState(initialItemsLeft);
  const [itemsRight, setItemsRight] = useState(initialItemsRight);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === 'left' ? itemsLeft : itemsRight;
    const destinationList = destination.droppableId === 'left' ? itemsLeft : itemsRight;

    if (source.droppableId === destination.droppableId) {
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);
      
      if (source.droppableId === 'left') {
        setItemsLeft([...sourceList]);
      } else {
        setItemsRight([...sourceList]);
      }
    } else {
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);

      setItemsLeft(source.droppableId === 'left' ? [...sourceList] : [...destinationList]);
      setItemsRight(source.droppableId === 'right' ? [...sourceList] : [...destinationList]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Droppable droppableId="left">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ padding: 8, width: 250, background: '#e0e0e0' }}
            >
              {itemsLeft.map((item, index) => (
                <DraggableItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="right">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ padding: 8, width: 250, background: '#f0f0f0' }}
            >
              {itemsRight.map((item, index) => (
                <DraggableItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
