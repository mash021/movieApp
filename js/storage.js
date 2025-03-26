// Local Storage Service
const storageService = {
  getMovieRating(movieId) {
    return parseInt(localStorage.getItem(`movie-${movieId}-rating`)) || 0;
  },

  saveMovieRating(movieId, rating) {
    localStorage.setItem(`movie-${movieId}-rating`, rating);
  },

  getMovieComments(movieId) {
    return JSON.parse(localStorage.getItem(`movie-${movieId}-comments`)) || [];
  },

  saveMovieComment(movieId, comment) {
    const comments = this.getMovieComments(movieId);
    comments.unshift(comment);
    localStorage.setItem(`movie-${movieId}-comments`, JSON.stringify(comments));
  },

  saveMovies(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
  },

  getMovies() {
    return JSON.parse(localStorage.getItem("movies")) || [];
  },
};
