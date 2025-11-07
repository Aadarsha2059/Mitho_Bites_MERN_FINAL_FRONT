import React from 'react';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import './FoodSearchFilters.css';

const FoodSearchFilters = ({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    categories,
    isLoading
}) => {
    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'price', label: 'Price' },
        { value: 'rating', label: 'Rating' },
        { value: 'createdAt', label: 'Newest' }
    ];

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('asc');
        }
    };

    return (
        <div className="food-search-filters">
            {/* Search Bar */}
            <div className="search-container">
                <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for delicious food..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Filters and Sort */}
            <div className="filters-container">
                {/* Category Filter */}
                <div className="filter-group">
                    <FaFilter className="filter-icon" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="filter-select"
                        disabled={isLoading}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div className="sort-container">
                    <FaSort className="sort-icon" />
                    <div className="sort-buttons">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                                className={`sort-btn ${sortBy === option.value ? 'active' : ''}`}
                                disabled={isLoading}
                            >
                                {option.label}
                                {sortBy === option.value && (
                                    <span className="sort-indicator">
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(search || categoryFilter) && (
                <div className="active-filters">
                    <span className="active-filters-label">Active Filters:</span>
                    {search && (
                        <span className="filter-tag">
                            Search: "{search}"
                            <button
                                onClick={() => setSearch('')}
                                className="remove-filter-btn"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {categoryFilter && (
                        <span className="filter-tag">
                            Category: {categories.find(c => c._id === categoryFilter)?.name}
                            <button
                                onClick={() => setCategoryFilter('')}
                                className="remove-filter-btn"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    <button
                        onClick={() => {
                            setSearch('');
                            setCategoryFilter('');
                            setSortBy('name');
                            setSortOrder('asc');
                        }}
                        className="clear-all-btn"
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodSearchFilters; 
