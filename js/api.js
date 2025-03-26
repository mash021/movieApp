// API Service
const apiService = {
  async fetchMovies() {
    try {
      const cachedMovies = storageService.getMovies();
      if (cachedMovies.length > 0) {
        return cachedMovies;
      }

      const response = await fetch(CONFIG.API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const movies = data.movies;

      storageService.saveMovies(movies);
      return movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return storageService.getMovies();
    }
  },

  async fetchMovieDetails(movieId) {
    try {
      const cachedMovies = storageService.getMovies();
      const cachedMovie = cachedMovies.find((movie) => movie.id === movieId);
      if (cachedMovie) {
        return cachedMovie;
      }

      const response = await fetch(CONFIG.API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const movie = data.movies.find((movie) => movie.id === movieId);

      if (movie) {
        const movies = storageService.getMovies();
        movies.push(movie);
        storageService.saveMovies(movies);
      }

      return movie || null;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return (
        storageService.getMovies().find((movie) => movie.id === movieId) || null
      );
    }
  },
};
