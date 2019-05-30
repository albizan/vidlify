import React from 'react';
import PropTypes from 'prop-types';

import Like from '../common/Like';
import TableHeader from '../common/TableHeader';
import TableBody from '../common/TableBody';

const MoviesTable = props => {
  const { movies, onLikeToggle, onMovieDelete, moviesCount, sortColumn, onSort } = props;

  // Array containing table columns labels
  const tableColumns = [
    { label: 'Title', target: 'title' },
    { label: 'Genre', target: 'genre.name' },
    { label: 'Stock', target: 'numberInStock' },
    { label: 'Rate', target: 'dailyRentalRate' },
    {
      key: 'like',
      content: movie => <Like onClick={() => onLikeToggle(movie)} liked={movie.liked} />,
    },
    {
      key: 'delete',
      content: movie => (
        <button onClick={() => onMovieDelete(movie)} className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <p>Showing {moviesCount} movies in the database.</p>
      <table className="table">
        <TableHeader columns={tableColumns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody items={movies} columns={tableColumns} />
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
