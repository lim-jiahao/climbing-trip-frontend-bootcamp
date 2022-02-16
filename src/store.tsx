import React, { useReducer } from 'react';

export enum ActionTypes {
  LOAD_TRIPS = 'LOAD_TRIPS',
  ADD_TRIP = 'ADD_TRIP',
  ADD_CLIMB = 'ADD_CLIMB'
}

export interface Climb {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  difficulty: string;
}

export type Climbs = Climb[]

export interface Trip {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  climbs: Climbs;
}

type Action =
  | { type: ActionTypes.LOAD_TRIPS; payload: { trips: Trip[] } }
  | { type: ActionTypes.ADD_TRIP; payload: { trip: Trip } }
  | {type: ActionTypes.ADD_CLIMB; payload: {trip: Trip, climb: Climb}}

interface State {
  trips: Trip[];
}

interface ContextInterface {
  store: State;
  dispatch : React.Dispatch<Action>;
}

const initialState = {
  trips: [],
};

export const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOAD_TRIPS:
      return { ...state, trips: action.payload.trips };
    case ActionTypes.ADD_TRIP:
      return { ...state, trips: [...state.trips, action.payload.trip] };
    case ActionTypes.ADD_CLIMB:
      action.payload.trip.climbs = [action.payload.climb, ...action.payload.trip.climbs];
      return { ...state, trips: [...state.trips, action.payload.trip] };
    default:
      return state;
  }
};

export const loadTripsAction = (trips: Trip[]) => {
  const action: Action = {
    type: ActionTypes.LOAD_TRIPS,
    payload: { trips },
  };

  return action;
};

export const addTripAction = (trip: Trip) => {
  const action: Action = {
    type: ActionTypes.ADD_TRIP,
    payload: { trip },
  };
  return action;
};

export const addClimbAction = (trip: Trip, climb: Climb) => {
  const action: Action = {
    type: ActionTypes.ADD_CLIMB,
    payload: { trip, climb },
  };

  return action;
};

export const Context = React.createContext<ContextInterface>({
  store: initialState,
  dispatch: () => {},
});
const { Provider } = Context;

export const StoreProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  return <Provider value={{ store, dispatch }}>{children}</Provider>;
};
