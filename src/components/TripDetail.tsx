import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Reorder } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Context, Trip, Climbs } from '../store';

import TripCard from './TripCard';
import AddClimbForm from './AddClimbForm';

const TripDetail: React.FC = () => {
  const { store, dispatch } = useContext(Context);
  const { id } = useParams();
  const { trips } = store;
  const trip = trips.filter((tripEl) => tripEl.id === Number(id))[0];

  return (
    <>
      {trip && (
        <div className="max-w-7xl mx-auto py-8">
          <div className="text-center">
            <h1 className="text-7xl">{trip.name}</h1>
          </div>
          <AddClimbForm trip={trip} />
          <div className="bg-white overflow-hidden">
            {trip.climbs && trip && (
              <>
                {trip.climbs.map((climb) => (
                  <TripCard climb={climb} trip={trip} key={climb.id} />
                ))}
              </>
            )}
          </div>
        </div>
      )}
      <div />
    </>

  );
};

export default TripDetail;
