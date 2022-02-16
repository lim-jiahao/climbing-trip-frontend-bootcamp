/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Context, Climb } from '../store';

import TripCard from './TripCard';
import AddClimbForm from './AddClimbForm';

const TripDetail: React.FC = () => {
  const { store, dispatch } = useContext(Context);
  const { id } = useParams();
  const { trips } = store;
  const trip = trips.filter((tripEl: any) => tripEl.id === Number(id))[0];
  console.log(trip);
  const [climbPriority, setClimbPriority] = useState<Climb[] | null>(null);

  useEffect(() => {
    setClimbPriority(trip?.climbs);
  }, [trip]);

  const handleOnDragEnd = (e: any) => {
    if (climbPriority) {
      const items = Array.from(climbPriority);
      const [reorderedItem] = items.splice(e.source.index, 1);
      items.splice(e.destination.index, 0, reorderedItem);
      setClimbPriority(items);
    }
  };

  return (
    <>
      {trip && (
        <div className="max-w-7xl mx-auto py-8">
          <div className="text-center">
            <h1 className="text-7xl">{trip.name}</h1>
          </div>
          <AddClimbForm trip={trip} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="climbs">
              {(provided) => (
                <ul
                  className="bg-white overflow-hidden"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {trip && climbPriority && (
                    <>
                      {climbPriority.map((climb: any, index) => (
                        <Draggable
                          key={climb.id}
                          draggableId={climb.name}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TripCard
                                climb={climb}
                                trip={trip}
                                key={climb.id}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <div />
    </>
  );
};

export default TripDetail;
