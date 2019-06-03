import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Styling
import './App.css';

// Font-Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as heartSolid, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';

// Custom components
import Navbar from '../common/Navbar';
import Movies from '../Movies';
import MovieForm from '../MovieForm';
import Customers from '../Customers';
import Rentals from '../Rentals';
import NotFound from '../common/NotFound';

library.add(heartSolid, heartRegular, faSortUp, faSortDown);

const App = () => {
  const paths = ['movies', 'customers', 'rentals'];
  return (
    <React.Fragment>
      <nav className="container-fluid">
        <Navbar paths={paths} />
      </nav>
      <main className="container my-3">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
