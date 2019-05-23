import React, { Component } from 'react';

import { getMovies } from '../../services/fakeMovieService';

// Custom components
import Pagination from '../common/pagination';
import Like from '../common/like';

// Import utils
import { paginate } from '../../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 5,
    currentPage: 1,
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !movie.liked;
    this.setState({ movies: newMovies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length } = this.state.movies;
    const { movies, pageSize, currentPage } = this.state;

    // Use paginate utility to create an array of items to display
    const moviestoDisplay = paginate(movies, currentPage, pageSize);

    // If length === 0 => There are no movies to display
    if (length === 0) return <p>There are no mobies to display</p>;
    return (
      <React.Fragment>
        <p>Showing {length} movies in the database.</p>
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
            {moviestoDisplay.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
