// UI Components
const uiComponents = {
  createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
            <img src="${movie.poster_url}" alt="${movie.title} Poster" 
                 onerror="this.src='https://via.placeholder.com/600x900?text=No+Image+Available'" />
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <div class="movie-brief">
                    <p><strong>Year:</strong> ${movie.movie_year}</p>
                    <p><strong>Director:</strong> ${movie.director}</p>
                </div>
                <div class="movie-rating">
                    <p><strong>Rating:</strong></p>
                    <div class="stars-display">
                        ${this.createRatingStars(
                          storageService.getMovieRating(movie.id)
                        )}
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
                <ul>${movie.actors
                  .map((actor) => `<li>${actor}</li>`)
                  .join("")}</ul>
            </div>
            <div class="rating-section">
                <h3>Rate this movie:</h3>
                <div class="stars">
                    ${[1, 2, 3, 4, 5]
                      .map(
                        (num) =>
                          `<i class="fas fa-star" data-rating="${num}"></i>`
                      )
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
