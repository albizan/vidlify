import React from 'react';
import './App.css';

// Font-Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as heartSolid, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';

// Custom components
import Movies from '../Movies';

library.add(heartSolid, heartRegular, faSortUp, faSortDown);

const App = () => {
  return (
    <main className="container my-4">
      <Movies />
    </main>
  );
};

export default App;
