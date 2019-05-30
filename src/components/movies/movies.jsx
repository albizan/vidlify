import React, { Component } from 'react';

import _ from 'lodash';

import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';

// Custom components
import Pagination from '../common/Pagination';
import MoviesTable from '../MoviesTable';
import ListGroup from '../common/ListGroup';

// Import utils
import { paginate } from '../../utils/paginate';

class Movies extends Component {
  constructor(props) {
    super(props);

    // Set state
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: {},
      sortColumn: { target: 'title', order: 'asc' },
    };
  }

  componentDidMount() {
    // Add All Genre at the beginning of the genres array
    const genresArray = [{ name: 'All Genres', _id: null }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genresArray,
      selectedGenre: genresArray[0],
    });
  }

  // Handle deletion of a movie, filter out that movie and set new state
  handleDeleteMovie = movie => {
    this.setState(prevState => {
      return {
        movies: prevState.movies.filter(m => m._id !== movie._id),
      };
    });
  };

  // Handle 'like' toggle of a movie
  handleLikeToggle = movie => {
    this.setState(prevState => {
      let movies = [...prevState.movies];
      const index = movies.indexOf(movie);
      movies[index].liked = !movie.liked;
      return { movies };
    });
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getDisplayedMovies = (filtered, sortColumn, currentPage, pageSize) => {
    // Use Lodash to sort filtered list
    const sorted = _.orderBy(filtered, [sortColumn.target], [sortColumn.order]);

    // Use paginate utility to create an array of items to display
    return paginate(sorted, currentPage, pageSize);
  };

  render() {
    const { movies, genres, selectedGenre, pageSize, currentPage, sortColumn } = this.state;

    // Check if All Genres is selected. If not, proceed with filtering on genre
    const filtered = selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;

    const displayedMovies = this.getDisplayedMovies(filtered, sortColumn, currentPage, pageSize);

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
            onSort={this.handleSort}
            moviesCount={filtered.length}
            sortColumn={sortColumn}
            movies={displayedMovies}
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
