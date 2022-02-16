<<<<<<< HEAD
import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { StoreProvider } from './store';
import Home from './components/Home';

const App: React.FC = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <StoreProvider>
              <Home />
            </StoreProvider>
        )}
        />
      </Routes>
    </BrowserRouter>
  </div>
);
=======
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { Context, loadTripsAction } from './store';
import Home from './components/Home';
import Trip from './components/TripDetail';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

const App: React.FC = () => {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`${REACT_APP_BACKEND_URL}/trips`);
        if (resp.data.trips) {
          dispatch(loadTripsAction(resp.data.trips));
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
      }
    })();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <Home />
          )}
          />
          <Route
            path="/trips/:id"
            element={(
              <Trip />
          )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
>>>>>>> 82df12ceb16e52f7c432cffe0429dbd48287ff7a

export default App;
