import React from 'react';
import PropTypes from 'prop-types';

import Like from '../common/Like';
import Table from '../common/Table';

const MoviesTable = ({ movies, onLikeToggle, onMovieDelete, moviesCount, sortColumn, onSort }) => {
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
      <Table items={movies} columns={tableColumns} sortColumn={sortColumn} onSort={onSort} />
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
