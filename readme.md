# Movie App - Final Version

A modern web application for displaying and managing movies with various features.

## Recent Changes and Improvements

### Data Management
- Removed movie data caching from localStorage
- Movies are now fetched directly from API
- Only user interactions (ratings and comments) are stored in localStorage
- Improved data freshness by always showing latest movie data

### Rating System
- Fixed rating display in movie cards
- Added numerical rating display (e.g., "3/5")
- Improved star rating visualization
- Ratings are persisted in localStorage

### Comments System
- Comments are stored in localStorage
- New comments appear at the top of the list
- Comments are associated with specific movies

### UI Improvements
- Clean and modern interface
- Responsive design
- Improved movie card layout
- Better rating visualization
- Enhanced user interaction feedback

### Code Structure
- Improved code organization
- Better separation of concerns
- Enhanced error handling
- Optimized API calls
- Cleaner code with English comments

## Features

### Movie Display
- Beautiful movie card layout
- Display of poster, title, description, year, and director
- "Read More" button for detailed information
- Main actors display in modal view

### Rating and Comments
- Movie rating capability (1 to 5 stars)
- Ratings stored in browser's localStorage
- Comment submission for each movie
- Display of user comment history

### Smart Sorting
- Sort by name (ascending and descending)
- Sort by year (ascending and descending)
- Sort by director name
- Automatic sorting when changing options

### Search Functionality
- Real-time search
- Search by movie title
- Instant results display

### Timer Feature
- Movie selection timer
- Page time tracking
- Visual and audio notifications
- Customizable timer duration

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome
- Local Storage API
- Fetch API

## How to Use
1. Clone the repository
2. Open `index.html` in your browser
3. Browse movies, rate them, and add comments
4. Use the search and sort features to find movies
5. Try the timer feature for movie selection

## Developer
- Mohammad Ali Sharifi

### Movie App

---

- Beautiful movie card layout
- Display of poster, title, description, year, and director
- "Read More" button for detailed information
- Main actors display in modal view

### Rating and Comments System

---

- Movie rating capability (1 to 5 stars)
- Ratings stored in browser's localStorage
- Comment submission for each movie
- Display of user comment history

### Smart Sorting

---

- Sort by name (ascending and descending)
- Sort by year (ascending and descending)
- Sort by director name
- Automatic sorting when changing options

### Data Storage

---

- Rating storage in localStorage
- Comment storage in localStorage
- Data persistence after browser closure

### Advanced User Interface

---

- Sticky navigation bar
- Movie detail modal
- Contact and social media footer
- Interactive buttons with hover effects
- Default image fallback for loading errors

## Technologies Used

---

- HTML5
- CSS
- JavaScript
- Font Awesome for icons
- localStorage for data persistence
- Regular Expressions for data validation and sorting
  - Used [Regex Generator](https://regex-generator.olafneumann.org/) for pattern creation and testing
  - Implemented pattern matching for search functionality
  - Enhanced input validation using regex patterns
# movieApp
[Netlify]url(https://alisharifi-portfolio.com)

