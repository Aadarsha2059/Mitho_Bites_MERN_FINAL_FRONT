import React from 'react';
import { useAdminRestaurant, useDeleteOneRestaurant } from '../../hooks/admin/useAdminRestaurant';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RestaurantTable() {
  const { restaurants, error, isPending } = useAdminRestaurant();
  const deleteOneRestaurantHook = useDeleteOneRestaurant();
  const [deleteId, setDeleteId] = React.useState(null);

  // Debug logging
  React.useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      console.log('=== RESTAURANT TABLE DEBUG ===');
      console.log('Restaurants data:', restaurants);
      console.log('Sample restaurant:', restaurants[0]);
      console.log('Restaurant image URLs:');
      restaurants.forEach((restaurant, index) => {
        console.log(`${index + 1}. ${restaurant.name}:`, {
          image: restaurant.image,
          hasImage: !!restaurant.image
        });
      });
    }
  }, [restaurants]);

  const handleDelete = () => {
    deleteOneRestaurantHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        toast.success('Restaurant deleted successfully');
      },
      onError: (err) => {
        toast.error('Failed to delete restaurant: ' + (err?.message || 'Unknown error'));
      },
    });
  };

  if (isPending) return <div>Loading restaurants...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="product-table-container">
      <h2>Restaurant List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((row) => (
            <tr key={row._id}>
              <td>
                <img
                  className="product-image"
                  src={row.image || 'https://via.placeholder.com/60?text=No+Image'}
                  alt={row.name}
                  style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', background: '#f3f4f6', border: '1px solid #e5e7eb' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60?text=No+Image'; }}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.location}</td>
              <td>{row.contact}</td>
              <td>
                <Link to={`/admin/restaurant/${row._id}`}><button className="view-btn">View</button></Link>
                <Link to={`/admin/restaurant/${row._id}/edit`}><button className="edit-btn">Edit</button></Link>
                <button onClick={() => setDeleteId(row._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple delete confirmation */}
      {deleteId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <h3>Delete Confirmation</h3>
            <p>Are you sure you want to delete this restaurant?</p>
            <button onClick={handleDelete} className="delete-btn" style={{ marginRight: 12 }}>Delete</button>
            <button onClick={() => setDeleteId(null)} className="edit-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
} 