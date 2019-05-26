import React from 'react';

import Like from '../common/like';

const MoviesTable = props => {
  const { movies, onLikeToggle, onMovieDelete, moviesCount } = props;
  return (
    <React.Fragment>
      <p>Showing {moviesCount} movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onClick={() => onLikeToggle(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onMovieDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MoviesTable;
