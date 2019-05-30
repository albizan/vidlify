import React from 'react';
import PropTypes from 'prop-types';

import Like from '../common/like';
import TableHeader from '../common/TableHeader';

// Array containing table columns labels
const tableColumns = [
  { label: 'Title', target: 'title' },
  { label: 'Genre', target: 'genre.name' },
  { label: 'Stock', target: 'numberInStock' },
  { label: 'Rate', target: 'dailyRentalRate' },
  { key: 'like' },
  { key: 'delete' },
];

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
        <TableHeader
          columns={tableColumns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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

export default MoviesTable;
