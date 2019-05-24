import React, { Component } from 'react';

import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';

// Custom components
import Pagination from '../common/pagination';
import Like from '../common/like';
import ListGroup from '../common/list-group';

// Import utils
import { paginate } from '../../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    selectedGenre: null,
  };

  // Handle deletion of a movie, filter out that movie and set new state
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  // Handle 'like' toggle of a movie
  // extract movies from state
  // search for movie index
  // apply 'like' toggle
  // set new state
  toggleLike = movie => {
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !movie.liked;
    this.setState({ movies: newMovies });
  };

  // Change state to match current selected page in pagination component
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // Change state to match current selected genre in list-group component
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre });
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const { movies, genres, selectedGenre, pageSize, currentPage } = this.state;
    const filtered = selectedGenre
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;

    // Use paginate utility to create an array of items to display
    const moviestoDisplay = paginate(filtered, currentPage, pageSize);

    console.log(filtered);

    // If length === 0 => There are no movies to display
    if (filtered.length === 0) return <p>There are no movies to display</p>;

    return (
      <div className="row">
        <div className="col col-md-3">
          <ListGroup
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
            items={genres}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
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
                      onClick={() => this.toggleLike(movie)}
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
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
