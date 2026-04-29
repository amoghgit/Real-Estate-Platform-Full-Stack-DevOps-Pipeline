import { useState, useEffect, useCallback } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSearch = useCallback(
    debounce((filters) => {
      onSearch(filters);
    }, 400),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch({ search, minPrice, maxPrice });
  }, [search, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({});
  };

  const hasActiveFilters = search || minPrice || maxPrice;

  return (
    <div className="glass-card p-4 sm:p-6">
      {/* Main Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-input"
            type="text"
            placeholder="Search properties by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-12"
          />
        </div>

        {/* Filter Toggle */}
        <button
          id="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 flex-shrink-0 ${
            showFilters ? 'bg-primary-600/20 border-primary-500/30 text-primary-400' : ''
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
        </button>

        {/* Clear Button */}
        {hasActiveFilters && (
          <button
            id="clear-filters"
            onClick={clearFilters}
            className="text-sm text-dark-200 hover:text-accent-coral transition-colors flex-shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label className="block text-xs font-medium text-dark-200 mb-1.5 uppercase tracking-wider">
              Min Price (₹)
            </label>
            <input
              id="min-price-input"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-dark-200 mb-1.5 uppercase tracking-wider">
              Max Price (₹)
            </label>
            <input
              id="max-price-input"
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
