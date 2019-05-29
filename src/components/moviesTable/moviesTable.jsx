import React from 'react';
import PropTypes from 'prop-types';

import Like from '../common/like';

const MoviesTable = props => {
  const {
    movies,
    onLikeToggle,
    onMovieDelete,
    moviesCount,
    sortColumn,
    onSort,
  } = props;
  return (
    <React.Fragment>
      <p>Showing {moviesCount} movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sort('title', sortColumn, onSort)}>Title</th>
            <th onClick={() => sort('genre.name', sortColumn, onSort)}>
              Genre
            </th>
            <th onClick={() => sort('numberInStock', sortColumn, onSort)}>
              Stock
            </th>
            <th onClick={() => sort('dailyRentalRate', sortColumn, onSort)}>
              Rate
            </th>
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

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  moviesCount: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onLikeToggle: PropTypes.func.isRequired,
  onMovieDelete: PropTypes.func.isRequired,
};

function sort(target, sortColumn, onSort) {
  if (sortColumn.target === target) {
    sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    onSort(sortColumn);
  } else {
    sortColumn.target = target;
    sortColumn.order = 'asc';
    onSort(sortColumn);
  }
}

export default MoviesTable;
