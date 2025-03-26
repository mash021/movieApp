// Event Handlers
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
      }
    });
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
