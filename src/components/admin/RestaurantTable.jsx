import './RestaurantTable.css'
import React, { useState, useEffect } from 'react'
import { useAdminRestaurant, useDeleteOneRestaurant } from '../../hooks/admin/useAdminRestaurant'
import { Link, useNavigate } from 'react-router-dom'
import DeleteModal from '../DeleteModal'

function Welcome(props) {
    return <h1 className="welcome-heading">{props.name}</h1>
}

// Placeholder component for failed images
const ImagePlaceholder = ({ name }) => (
    <div className="image-placeholder">
        <span>{name.charAt(0).toUpperCase()}</span>
    </div>
);

// Test image component
const TestImage = ({ src, alt, onSuccess, onError }) => {
    const [status, setStatus] = useState('loading');
    
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setStatus('loaded');
            onSuccess && onSuccess();
        };
        img.onerror = () => {
            setStatus('error');
            onError && onError();
        };
        img.src = src;
    }, [src, onSuccess, onError]);
    
    if (status === 'loading') {
        return <div className="image-loading">Loading...</div>;
    }
    
    if (status === 'error') {
        return <div className="image-error">Failed to load</div>;
    }
    
    return (
        <img
            className='restaurant-image'
            src={src}
            alt={alt}
        />
    );
};

export default function RestaurantTable() {
    const { restaurants, error, isPending } = useAdminRestaurant()
    const deleteOneRestaurantHook = useDeleteOneRestaurant()
    const [deleteId, setDeleteId] = useState(null)
    const [imageErrors, setImageErrors] = useState(new Set())
    const [loadedImages, setLoadedImages] = useState(new Set())
    const navigate = useNavigate()

    const handleDelete = () => {
        deleteOneRestaurantHook.mutate(
            deleteId,
            {
                onSuccess: () => {
                    setDeleteId(null)
                }
            }
        )
    }

    const handleImageError = (restaurantId) => {
        setImageErrors(prev => new Set(prev).add(restaurantId));
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(restaurantId);
            return newSet;
        });
    };

    const handleImageLoad = (restaurantId) => {
        setLoadedImages(prev => new Set(prev).add(restaurantId));
        setImageErrors(prev => {
            const newSet = new Set(prev);
            newSet.delete(restaurantId);
            return newSet;
        });
    };

    // Reset image states when restaurants change
    useEffect(() => {
        if (restaurants && restaurants.length > 0) {
            setImageErrors(new Set());
            setLoadedImages(new Set());
        }
    }, [restaurants]);

    if (isPending) return <div className="loading">Loading...</div>
    if (error) return <div className="error">Error: {error.message}</div>

    return (
        <div className="restaurant-table-container">
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete this restaurant?"
            />
            <h3 className="table-title">Restaurant Table</h3>
            
            <table className='restaurant-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map((restaurant) => {
                            const hasImageError = imageErrors.has(restaurant._id);
                            const isImageLoaded = loadedImages.has(restaurant._id);
                            
                            return (
                                <tr key={restaurant._id} className="restaurant-row">
                                    <td>{restaurant.name}</td>
                                    <td>
                                        {restaurant.image && !hasImageError ? (
                                            <img
                                                className="restaurant-image"
                                                src={restaurant.image}
                                                alt={restaurant.name}
                                                onLoad={() => handleImageLoad(restaurant._id)}
                                                onError={() => handleImageError(restaurant._id)}
                                            />
                                        ) : (
                                            <ImagePlaceholder name={restaurant.name} />
                                        )}
                                    </td>
                                    <td>{restaurant.location || 'N/A'}</td>
                                    <td>{restaurant.contact || 'N/A'}</td>
                                    <td className="actions-cell">
                                        <button className="btn view-btn" onClick={() => navigate(`/admin/restaurant/${restaurant._id}`)}>View</button>
                                        <button className="btn edit-btn" onClick={() => navigate(`/admin/restaurant/${restaurant._id}/edit`)}>Edit</button>
                                        <button className="btn delete-btn" onClick={() => setDeleteId(restaurant._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {restaurants.length === 0 && (
                <div className="no-data">
                    <p>No restaurants found</p>
                </div>
            )}
        </div>
    )
} 
