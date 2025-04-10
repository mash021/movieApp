// Cache Service - Manages data caching with size limits and auto-refresh
const cacheService = {
  // Maximum cache size (5MB)
  MAX_CACHE_SIZE: 5 * 1024 * 1024,

  // Cache expiration time (24 hours)
  CACHE_EXPIRATION: 24 * 60 * 60 * 1000,

  // Get current cache size
  getCacheSize() {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage.getItem(key).length * 2; // UTF-16 uses 2 bytes per character
      }
    }
    return size;
  },

  // Check if cache is full
  isCacheFull(newItemSize) {
    return this.getCacheSize() + newItemSize > this.MAX_CACHE_SIZE;
  },

  // Remove oldest items when cache is full
  cleanupCache(requiredSpace) {
    const items = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const item = {
          key,
          size: localStorage.getItem(key).length * 2,
          timestamp: JSON.parse(localStorage.getItem(key)).timestamp || 0,
        };
        items.push(item);
      }
    }

    // Sort by timestamp (oldest first)
    items.sort((a, b) => a.timestamp - b.timestamp);

    // Remove items until we have enough space
    let freedSpace = 0;
    for (const item of items) {
      if (freedSpace >= requiredSpace) break;
      localStorage.removeItem(item.key);
      freedSpace += item.size;
    }
  },

  // Save item to cache with timestamp
  setItem(key, value) {
    const item = {
      value,
      timestamp: Date.now(),
    };

    const itemSize = JSON.stringify(item).length * 2;

    if (this.isCacheFull(itemSize)) {
      this.cleanupCache(itemSize);
    }

    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get item from cache with expiration check
  getItem(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);

    // Check if item is expired
    if (Date.now() - parsedItem.timestamp > this.CACHE_EXPIRATION) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.value;
  },

  // Remove item from cache
  removeItem(key) {
    localStorage.removeItem(key);
  },

  // Clear all cache
  clearCache() {
    localStorage.clear();
  },
};

export default cacheService;
