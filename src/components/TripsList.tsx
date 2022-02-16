import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context, Trip } from '../store';

const TripsList = () => {
  const { store, dispatch } = useContext(Context);
  const { trips } = store;

  const handleClick = (trip: Trip) => {
    console.log(trip);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, trip: Trip) => {
    if (e.key === 'Enter') {
      console.log('entered on trips');
    }
  };
  console.log(trips);
  return (
    <div className="flex w-3/4 flex-wrap justify-center m-auto">
      {trips.map((trip) => (
        <div role="button" tabIndex={0} onClick={() => handleClick(trip)} onKeyDown={(e) => handleKeyPress(e, trip)} className="w-1/4 border-2 border-black rounded p-2 m-2 hover:bg-gray-200 hover:cursor-pointer">
          <Link to={`/trips/${trip.id}`}>
            <p>
              Name:
              {' '}
              {trip.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TripsList;
