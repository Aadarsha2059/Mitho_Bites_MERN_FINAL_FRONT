import './CategoryTable.css'
import React, { useState, useEffect } from 'react'
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'
import { getBackendImageUrl } from '../../utils/backend-image'

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
            className='category-image'
            src={src}
            alt={alt}
        />
    );
};

// function NameComponent({ name, username }) {
//     return <h2 className="name-username">{name} {username}</h2>
// }

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory()
    const deleteOneCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)
    const [imageErrors, setImageErrors] = useState(new Set())
    const [loadedImages, setLoadedImages] = useState(new Set())
    const [backendStatus, setBackendStatus] = useState('checking')

    // Test backend connectivity
    useEffect(() => {
        const testBackend = async () => {
            try {
                const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
                const response = await fetch(`${baseURL}/`);
                if (response.ok) {
                    setBackendStatus('connected');
                    console.log('Backend is accessible');
                } else {
                    setBackendStatus('error');
                    console.error('Backend responded with error:', response.status);
                }
            } catch (err) {
                setBackendStatus('error');
                console.error('Backend connection failed:', err);
            }
        };
        
        testBackend();
    }, []);

    // Debug logging
    console.log('=== CATEGORY TABLE DEBUG ===');
    console.log('Backend status:', backendStatus);
    console.log('Categories data:', categories);
    console.log('Categories loading:', isPending);
    console.log('Categories error:', error);
    console.log('Image errors:', Array.from(imageErrors));
    console.log('Loaded images:', Array.from(loadedImages));
    
    if (categories && categories.length > 0) {
        console.log('Category filepaths:');
        categories.forEach(cat => {
            const imageUrl = getBackendImageUrl(cat.filepath);
            console.log(`- ${cat.name}:`, {
                originalFilepath: cat.filepath,
                generatedImageUrl: imageUrl,
                hasFilepath: !!cat.filepath
            });
        });
    }

    const handleDelete = () => {
        deleteOneCategoryHook.mutate(
            deleteId,
            {
                onSuccess: () => {
                    setDeleteId(null)
                }
            }
        )
    }

    const handleImageError = (categoryId, categoryName, imageUrl) => {
        console.error(`Failed to load image for category: ${categoryName}`, {
            categoryId,
            imageUrl,
            timestamp: new Date().toISOString()
        });
        setImageErrors(prev => new Set(prev).add(categoryId));
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(categoryId);
            return newSet;
        });
    };

    const handleImageLoad = (categoryId, categoryName, imageUrl) => {
        console.log(`Successfully loaded image for ${categoryName}:`, imageUrl);
        setLoadedImages(prev => new Set(prev).add(categoryId));
        setImageErrors(prev => {
            const newSet = new Set(prev);
            newSet.delete(categoryId);
            return newSet;
        });
    };

    // Reset image states when categories change
    useEffect(() => {
        if (categories && categories.length > 0) {
            setImageErrors(new Set());
            setLoadedImages(new Set());
        }
    }, [categories]);

    if (isPending) return <div className="loading">Loading...</div>
    if (error) return <div className="error">Error: {error.message}</div>

    return (
        <div className="category-table-container">
            {/* <Welcome name="Aadarsha" />
            <NameComponent name="Aadarshaa" username="aadarsha2059" /> */}
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete?"
            />
            <h3 className="table-title">Category Table</h3>
            {/* Backend status indicator */}
            <div style={{ 
                background: backendStatus === 'connected' ? '#e8f5e8' : backendStatus === 'error' ? '#ffeaea' : '#fff3cd',
                color: backendStatus === 'connected' ? '#2e7d32' : backendStatus === 'error' ? '#d32f2f' : '#856404',
                padding: '8px 12px', 
                margin: '10px 0', 
                borderRadius: '5px',
                fontSize: '12px',
                fontWeight: '500'
            }}>
                <strong>Backend Status:</strong> {backendStatus === 'connected' ? '✅ Connected' : backendStatus === 'error' ? '❌ Connection Failed' : '⏳ Checking...'}
            </div>
            {/* Debug info removed for clean UI */}
            
            <table className='category-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories
                          .filter(row => row.name !== 'Thakali Khana items')
                          .map((row) => {
                            const imageUrl = getBackendImageUrl(row.filepath);
                            const hasImageError = imageErrors.has(row._id);
                            const isImageLoaded = loadedImages.has(row._id);
                            
                            console.log(`Rendering category ${row.name}:`, {
                                filepath: row.filepath,
                                imageUrl: imageUrl,
                                hasError: hasImageError,
                                isLoaded: isImageLoaded
                            });
                            
                            return (
                                <tr key={row._id} className="category-row">
                                    <td>{row.name}</td>
                                    <td>
                                        {hasImageError ? (
                                            <ImagePlaceholder name={row.name} />
                                        ) : (
                                            <TestImage
                                                src={imageUrl}
                                                alt={row.name}
                                                onSuccess={() => handleImageLoad(row._id, row.name, imageUrl)}
                                                onError={() => handleImageError(row._id, row.name, imageUrl)}
                                            />
                                        )}
                                    </td>
                                    <td className="actions-cell">
                                        <Link to={`/admin/category/${row._id}`}>
                                            <button className="btn view-btn">View</button>
                                        </Link>
                                        <Link to={`/admin/category/${row._id}/edit`}>
                                            <button className="btn edit-btn">Edit</button>
                                        </Link>
                                        <button
                                            className="btn delete-btn"
                                            onClick={() => setDeleteId(row._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

