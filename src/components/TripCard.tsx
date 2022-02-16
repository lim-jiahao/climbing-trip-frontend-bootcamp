import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { Climb, Trip } from '../store';

interface Props {
  climb: Climb,
  trip: Trip
}

const TripCard = ({ climb, trip }: Props) => (
  <div key={climb.id} className="my-2 rounded shadow">
    <div className="hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-indigo-600 truncate">{climb.name}</p>
          <div className="ml-2 flex-shrink-0 flex">
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" />
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {trip.name}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">

            <p>
              {climb.difficulty}
              {' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default TripCard;
