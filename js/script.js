// Constants and Configuration
const API_URL =
  "https://raw.githubusercontent.com/mash021/mash021.github.io/main/API/data.json";
const API_KEY = "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E9vpo9tXhK6G"; // Read-only API key

// Function to normalize image URL
function normalizeImageUrl(url) {
  if (!url)
    return "https://via.placeholder.com/600x900?text=No+Image+Available";
  return url;
}

// DOM Elements - All UI components we need to interact with
const DOM = {
  moviePoster: document.getElementById("movie-poster"),
  movieTitle: document.getElementById("movie-title"),
  movieDescription: document.getElementById("movie-description"),
  movieYear: document.getElementById("movie-year"),
  movieDirector: document.getElementById("movie-director"),
  moviePrice: document.getElementById("movie-price"),
  movieActors: document.getElementById("movie-actors"),
  stars: document.querySelectorAll(".stars i"),
  ratingDisplay: document.getElementById("rating-display"),
  commentInput: document.getElementById("comment-input"),
  submitComment: document.getElementById("submit-comment"),
  commentsList: document.getElementById("comments-list"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector(".sort-select"),
  container: document.querySelector(".container"),
};

// Application State - Keeps track of all dynamic data
const state = {
  movies: [],
  currentMovie: null,
  ratings: {},
  comments: {},
};

// Local Storage Service - Handles user ratings and comments
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
};

// UI Components - Handles all visual elements and their creation
const uiComponents = {
  createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    const posterUrl = normalizeImageUrl(movie.poster_url);
    const rating = storageService.getMovieRating(movie.id);
    movieCard.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title} Poster" 
           onerror="this.src='https://via.placeholder.com/600x900?text=No+Image+Available'" />
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <div class="movie-brief">
          <p><strong>Year:</strong> ${movie.movie_year}</p>
          <p><strong>Director:</strong> ${movie.director}</p>
        </div>
        <div class="movie-rating">
          <p><strong>Rating:</strong> ${rating}/5</p>
          <div class="stars-display">
            ${this.createRatingStars(rating)}
          </div>
        </div>
        <button class="read-more-btn" data-movie-id="${
          movie.id
        }">Read More</button>
      </div>
    `;
    return movieCard;
  },

  createRatingStars(rating) {
    return Array.from(
      { length: 5 },
      (_, i) => `<i class="fas fa-star ${i < rating ? "active" : ""}"></i>`
    ).join("");
  },

  createModal() {
    if (!document.querySelector(".modal")) {
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="modal-body"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  },

  createMovieDetailsHTML(movie) {
    return `
      <h2>${movie.title}</h2>
      <p>${movie.description}</p>
      <div class="movie-details">
        <p><strong>Year:</strong> ${movie.movie_year}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Price:</strong> $${movie.price}</p>
      </div>
      <div class="actors">
        <h3>Main Actors:</h3>
        <ul>${movie.actors.map((actor) => `<li>${actor}</li>`).join("")}</ul>
      </div>
      <div class="rating-section">
        <h3>Rate this movie:</h3>
        <div class="stars">
          ${[1, 2, 3, 4, 5]
            .map((num) => `<i class="fas fa-star" data-rating="${num}"></i>`)
            .join("")}
        </div>
        <p class="rating-display"></p>
      </div>
      <div class="comments-section">
        <h3>Comments:</h3>
        <div class="comment-form">
          <textarea class="comment-input" placeholder="Write your comment here..."></textarea>
          <button class="submit-comment">Submit Comment</button>
        </div>
        <div class="comments-list"></div>
      </div>
    `;
  },
};

// Event Handlers - Manages all user interactions and events
const eventHandlers = {
  setupReadMoreListeners() {
    const modal = document.querySelector(".modal");
    const modalContent = modal.querySelector(".modal-body");
    const closeBtn = modal.querySelector(".close-modal");

    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const movieId = parseInt(button.dataset.movieId);
        const movie = state.movies.find((m) => m.id === movieId);
        if (movie) this.showMovieDetails(modal, modalContent, movie);
      });
    });

    closeBtn.addEventListener("click", () => this.closeModal(modal));
    window.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal(modal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "block") {
        this.closeModal(modal);
      }
    });
  },

  closeModal(modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  },

  showMovieDetails(modal, modalContent, movie) {
    state.currentMovie = movie;
    modalContent.innerHTML = uiComponents.createMovieDetailsHTML(movie);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    this.setupModalEventListeners(modalContent, movie.id);
    this.showMovieDetailsInMain(movie);
  },

  showMovieDetailsInMain(movie) {
    const detailsContainer = document.querySelector(".movie-details-container");
    if (detailsContainer) {
      detailsContainer.style.display = "block";
      DOM.moviePoster.src = movie.poster_url;
      DOM.movieTitle.textContent = movie.title;
      DOM.movieDescription.textContent = movie.description;
      DOM.movieYear.textContent = movie.movie_year;
      DOM.movieDirector.textContent = movie.director;
      DOM.moviePrice.textContent = `$${movie.price}`;
      DOM.movieActors.textContent = movie.actors.join(", ");

      const savedRating = storageService.getMovieRating(movie.id);
      if (savedRating) {
        this.highlightStars(DOM.stars, savedRating);
        DOM.ratingDisplay.textContent = `Your rating: ${savedRating}/5`;
      }

      const savedComments = storageService.getMovieComments(movie.id);
      DOM.commentsList.innerHTML = "";
      savedComments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.textContent = comment;
        DOM.commentsList.appendChild(commentElement);
      });
    }
  },

  setupModalEventListeners(modalContent, movieId) {
    const stars = modalContent.querySelectorAll(".stars i");
    const ratingDisplay = modalContent.querySelector(".rating-display");
    const submitComment = modalContent.querySelector(".submit-comment");
    const commentInput = modalContent.querySelector(".comment-input");
    const commentsList = modalContent.querySelector(".comments-list");

    const savedRating = storageService.getMovieRating(movieId);
    const savedComments = storageService.getMovieComments(movieId);

    if (savedRating) {
      this.highlightStars(stars, savedRating);
      ratingDisplay.textContent = `Your rating: ${savedRating}/5`;
    }

    stars.forEach((star) => {
      star.addEventListener("mouseover", () => {
        this.highlightStars(stars, parseInt(star.dataset.rating));
      });

      star.addEventListener("mouseout", () => {
        if (savedRating) {
          this.highlightStars(stars, savedRating);
        } else {
          this.clearStars(stars);
        }
      });

      star.addEventListener("click", () => {
        const rating = parseInt(star.dataset.rating);
        storageService.saveMovieRating(movieId, rating);
        this.highlightStars(stars, rating);
        ratingDisplay.textContent = `Your rating: ${rating}/5`;
        this.updateMainRating(movieId, rating);
      });
    });

    savedComments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.textContent = comment;
      commentsList.appendChild(commentElement);
    });

    submitComment.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.textContent = commentText;
        commentsList.insertBefore(commentElement, commentsList.firstChild);
        storageService.saveMovieComment(movieId, commentText);
        commentInput.value = "";
        this.updateMainComments(movieId, commentText);
      }
    });
  },

  updateMainRating(movieId, rating) {
    if (state.currentMovie && state.currentMovie.id === movieId) {
      this.highlightStars(DOM.stars, rating);
      DOM.ratingDisplay.textContent = `Your rating: ${rating}/5`;
    }
  },

  updateMainComments(movieId, commentText) {
    if (state.currentMovie && state.currentMovie.id === movieId) {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.textContent = commentText;
      DOM.commentsList.insertBefore(
        commentElement,
        DOM.commentsList.firstChild
      );
    }
  },

  highlightStars(stars, rating) {
    stars.forEach((star) => {
      const starRating = parseInt(star.dataset.rating);
      star.classList.toggle("active", starRating <= rating);
    });
  },

  clearStars(stars) {
    stars.forEach((star) => star.classList.remove("active"));
  },
};

// API Service - Handles all external data fetching
const apiService = {
  async fetchMovies() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  },

  async fetchMovieDetails(movieId) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.movies.find((movie) => movie.id === movieId) || null;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  },
};

// Movie Manager - Handles all movie-related operations and UI updates
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
      "year-desc": (a, b) => a.movie_year - b.movie_year,
      director: (a, b) => a.director.localeCompare(b.director),
    };
    return [...state.movies].sort(sortOptions[criteria] || (() => 0));
  },
};

// Timer Class - Manages countdown and page time tracking
class Timer {
  constructor() {
    this.selectionTimer = null;
    this.pageTimer = null;
    this.startTime = null;
    this.timerModal = document.querySelector(".timer-modal");
    this.closeTimerBtn = document.querySelector(".close-timer");
    this.timerButton = document.getElementById("timerButton");
    this.initializeTimers();
  }

  initializeTimers() {
    const startSelectionTimerBtn = document.getElementById(
      "startSelectionTimer"
    );
    const selectionTimeInput = document.getElementById("selectionTime");
    const selectionTimerDisplay = document.getElementById(
      "selectionTimerDisplay"
    );

    this.timerButton.addEventListener("click", () => {
      this.showTimerModal();
    });

    this.closeTimerBtn.addEventListener("click", () => {
      this.hideTimerModal();
    });

    this.timerModal.addEventListener("click", (e) => {
      if (e.target === this.timerModal) {
        this.hideTimerModal();
      }
    });

    startSelectionTimerBtn.addEventListener("click", () => {
      const minutes = parseInt(selectionTimeInput.value) || 5;
      this.startSelectionTimer(minutes);
    });

    this.startPageTimer();
  }

  showTimerModal() {
    this.timerModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  hideTimerModal() {
    this.timerModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  startSelectionTimer(minutes) {
    if (this.selectionTimer) {
      clearInterval(this.selectionTimer);
    }

    let timeLeft = minutes * 60;
    this.updateSelectionTimerDisplay(timeLeft);

    this.selectionTimer = setInterval(() => {
      timeLeft--;
      this.updateSelectionTimerDisplay(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(this.selectionTimer);
        this.handleTimerComplete();
      }
    }, 1000);
  }

  updateSelectionTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = document.getElementById("selectionTimerDisplay");
    display.textContent = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  startPageTimer() {
    this.startTime = Date.now();
    const pageTimeDisplay = document.getElementById("pageTimeDisplay");

    this.pageTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      pageTimeDisplay.textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  }

  handleTimerComplete() {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
    );
    audio.play();

    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Time's Up!", {
            body: "Your movie selection time has expired!",
            icon: "https://via.placeholder.com/64",
          });
        }
      });
    }

    const display = document.getElementById("selectionTimerDisplay");
    display.textContent = "Time's Up!";
    display.style.color = "#ff4444";
    setTimeout(() => {
      display.style.color = "white";
      display.textContent = "00:00";
    }, 2000);
  }
}

// Initialize Application
function initializeApp() {
  uiComponents.createModal();
  new Timer();
  movieManager.initializeMovies();

  DOM.searchInput.addEventListener("input", (e) => {
    const searchResults = movieManager.searchMovies(e.target.value);
    movieManager.renderMovies(searchResults);
  });

  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener("change", (e) => {
      const sortedMovies = movieManager.sortMovies(e.target.value);
      movieManager.renderMovies(sortedMovies);
    });
  }
}

// Start the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
