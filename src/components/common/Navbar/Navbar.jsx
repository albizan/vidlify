import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ paths }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Vidlify
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {paths.map(path => {
            return (
              <li className="nav-item">
                <NavLink className="nav-link" to={buildPath(path)}>
                  {buildLabel(path)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

function buildPath(path) {
  return '/' + path;
}

function buildLabel(path) {
  // Return path with first letter to uppercase
  return path.charAt(0).toUpperCase() + path.slice(1);
}
