// Movie Manager
const movieManager = {
  async initializeMovies() {
    state.movies = await apiService.fetchMovies();
    this.renderMovies(state.movies);
  },

  renderMovies(moviesToRender) {
    DOM.container.innerHTML = "";
    if (moviesToRender.length === 0) {
      DOM.container.innerHTML = '<div class="no-results">No movies found</div>';
      return;
    }
    moviesToRender.forEach((movie) => {
      DOM.container.appendChild(uiComponents.createMovieCard(movie));
    });
    eventHandlers.setupReadMoreListeners();
  },

  searchMovies(keyword) {
    return state.movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  sortMovies(criteria) {
    const sortOptions = {
      name: (a, b) => a.title.localeCompare(b.title),
      "name-desc": (a, b) => b.title.localeCompare(a.title),
      year: (a, b) => a.movie_year - b.movie_year,
      "year-desc": (a, b) => b.movie_year - a.movie_year,
      director: (a, b) => a.director.localeCompare(b.director),
    };
    return [...state.movies].sort(sortOptions[criteria] || (() => 0));
  },
};
