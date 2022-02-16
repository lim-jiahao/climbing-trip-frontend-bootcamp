import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import TripsList from './TripsList';
import AddTripForm from './AddTripForm';

axios.defaults.withCredentials = true;

const Home = () => (
  <div>
    <AddTripForm />
    <TripsList />
  </div>
);

export default Home;
