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

export default App;
