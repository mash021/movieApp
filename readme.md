# Movie App

A modern web application for browsing and managing movies with a beautiful user interface and interactive features.

## Features

### 1. Movie Grid Display

- Responsive grid layout for movie cards
- Beautiful hover effects and animations
- Each card displays essential movie information:
  - Movie poster
  - Title
  - Release year
  - Rating
  - Quick access to detailed view

### 2. Detailed Movie Information

- Modal view for comprehensive movie details
- Displays:
  - Full movie description
  - Genre information
  - Director and cast details
  - Release year
  - Rating

### 3. User Interaction

- Comment system for each movie
- Star rating functionality
- Comments are persisted in localStorage
- Real-time updates when adding new comments

### 4. Search Functionality

- Real-time search as you type
- Search by movie title
- Instant results display
- Case-insensitive search

### 5. Sorting Capabilities

- Sort movies by release year
- Toggle between ascending and descending order
- Smooth animations during sorting

### 6. Filtering Options

- Filter movies by release year
- Combine filters with search functionality
- Dynamic grid updates

## Technical Features

### Performance

- Efficient data caching using localStorage
- Optimized image loading
- Smooth animations and transitions

### User Experience

- Responsive design for all screen sizes
- Dark mode support
- Loading indicators
- Error handling with user-friendly messages
- Smooth scrolling behavior

### Code Quality

- Clean and maintainable code structure
- Modular JavaScript functions
- Well-organized CSS with variables
- Comprehensive error handling
- English comments for better maintainability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Add more sorting options (by rating, title)
- Implement user authentication
- Add more filter categories
- Include movie trailers
- Add pagination for large movie lists
- Implement social sharing features

## Main Features

- Display movie list with complete details
- Movie rating system
- Comment functionality for each movie
- Movie search capability
- Sort movies by different criteria
- Movie selection timer with notifications
- Data persistence using localStorage
- Responsive user interface

## Recent Changes

### Project Structure

- Code separation into different modules for better management
- Created separate files for each component:
  - `config.js`: Application configuration
  - `dom.js`: DOM elements management
  - `state.js`: Application state management
  - `storage.js`: Storage management
  - `ui.js`: UI components
  - `api.js`: API service
  - `events.js`: Event handlers
  - `timer.js`: Timer management
  - `movieManager.js`: Movie management

### Performance Improvements

- Optimized sequential file loading
- Improved memory management
- Enhanced initial load speed

### UI Enhancements

- New logo design
- Improved movie card display
- Added new animations

## How to Use

1. Clone the project:

```bash
git clone https://github.com/mash021/movieApp.git
```

2. Open `index.html` in your browser

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome
- Local Storage API

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
