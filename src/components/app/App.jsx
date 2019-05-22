import React from 'react';
import './App.css';

// Font-Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';

// Custom components
import Movies from '../movies';

library.add(heartSolid, heartRegular);

const App = () => {
  return (
    <main className="container">
      <Movies />
    </main>
  );
};

export default App;
