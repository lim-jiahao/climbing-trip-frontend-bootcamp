import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, loadTripsAction } from '../store';
import TripsList from './TripsList';
import AddTripForm from './AddTripForm';

axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

const Home = () => {
  const { store, dispatch } = useContext(Context);
  const { trips } = store;

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`${REACT_APP_BACKEND_URL}/trips`);
        console.log(resp);
        dispatch(loadTripsAction(resp.data.trips));
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
      }
    })();
  }, []);

  return (
    <div>
      <AddTripForm />
      <TripsList />
    </div>
  );
};

export default Home;
