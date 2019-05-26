import React, { Component } from 'react';

import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';

// Custom components
import Pagination from '../common/pagination';
import MoviesTable from '../moviesTable';
import ListGroup from '../common/list-group';

// Import utils
import { paginate } from '../../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
  };

  // Handle deletion of a movie, filter out that movie and set new state
  handleDeleteMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  // Handle 'like' toggle of a movie
  // extract movies from state, search for movie index, apply 'like' toggle, set new state
  handleLikeToggle = movie => {
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
    // When a genre is selected, reset current page to zero
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  componentDidMount() {
    // Add All Genre at the beginning of the genres array
    const genresArray = [{ name: 'All Genres', _id: null }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genresArray,
      selectedGenre: genresArray[0],
    });
  }

  render() {
    const { movies, genres, selectedGenre, pageSize, currentPage } = this.state;
    // Check if All Genres is selected. If not, proceed with filtering
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    // Use paginate utility to create an array of items to display
    const moviestoDisplay = paginate(filtered, currentPage, pageSize);

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
          <MoviesTable
            onLikeToggle={this.handleLikeToggle}
            onMovieDelete={this.handleDeleteMovie}
            moviesCount={filtered.length}
            movies={moviestoDisplay}
          />
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
