import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSpinner, FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import { useFoodProducts } from '../hooks/useFoodProducts';
import { useFoodCategories } from '../hooks/useFoodCategories';
import { useCart } from '../hooks/useCart';
import FoodSearchFilters from '../components/food/FoodSearchFilters';
import FoodProductCard from '../components/food/FoodProductCard';
import './Menu.css';

export default function Menu() {
    const {
        products,
        isLoading,
        error,
        search,
        setSearch,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        pageNumber,
        setPageNumber,
        pagination,
        canNextPage,
        canPreviousPage
    } = useFoodProducts();

    const { categories, isLoading: categoriesLoading } = useFoodCategories();
    const { addToCart, isAddingToCart } = useCart();

    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('foodFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('foodFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleAddToCart = (product) => {
        addToCart(product._id, 1);
    };

    const handleViewDetails = (product) => {
        // Navigate to product details page
        console.log('View details for:', product.name);
        // You can implement navigation here
    };

    const handleToggleFavorite = (product) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.some(fav => fav._id === product._id);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav._id !== product._id);
            } else {
                return [...prevFavorites, product];
            }
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setCategoryFilter('');
        setSortBy('name');
        setSortOrder('asc');
        setPageNumber(1);
    };

    return (
        <section className="menu-container">
            {/* Header */}
            <div className="menu-header">
                <a href="/" className="back-to-home" aria-label="Back to homepage">
                    <FaArrowLeft size={18} />
                    <span>Back to Home</span>
                </a>

                <div className="menu-title-section">
                    <h1 className="menu-title">Our Delicious Menu 🍽️</h1>
                    <p className="menu-subtitle">Discover authentic Nepali flavors and traditional dishes</p>
                    <div className="title-underline" />
                </div>
            </div>

            {/* Search and Filters */}
            <FoodSearchFilters
                search={search}
                setSearch={setSearch}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                categories={categories}
                isLoading={isLoading || categoriesLoading}
            />

            {/* Results Summary */}
            <div className="results-summary">
                <div className="results-info">
                    <span className="results-count">
                        {pagination.total || 0} {pagination.total === 1 ? 'item' : 'items'} found
                    </span>
                    {(search || categoryFilter) && (
                        <button onClick={handleClearFilters} className="clear-filters-btn">
                            Clear all filters
                        </button>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="loading-container">
                    <FaSpinner className="loading-spinner" />
                    <p>Loading delicious food...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error-container">
                    <p>Sorry, we couldn't load the menu. Please try again later.</p>
                    <button onClick={() => window.location.reload()} className="retry-btn">
                        Retry
                    </button>
                </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && (
                <>
                    {products.length === 0 ? (
                        <div className="no-results">
                            <div className="no-results-icon">🍽️</div>
                            <h3>No dishes found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button onClick={handleClearFilters} className="clear-filters-btn">
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map((product) => (
                                <FoodProductCard
                                    key={product._id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onViewDetails={handleViewDetails}
                                    onToggleFavorite={handleToggleFavorite}
                                    isFavorite={favorites.some(fav => fav._id === product._id)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setPageNumber(pageNumber - 1)}
                                disabled={!canPreviousPage}
                                className="pagination-btn"
                            >
                                Previous
                            </button>
                            
                            <div className="page-info">
                                Page {pagination.page} of {pagination.totalPages}
                            </div>
                            
                            <button
                                onClick={() => setPageNumber(pageNumber + 1)}
                                disabled={!canNextPage}
                                className="pagination-btn"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
