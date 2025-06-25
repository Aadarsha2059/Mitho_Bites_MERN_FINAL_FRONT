import React from 'react'
import { useAdminProduct } from '../../hooks/admin/useAdminProduct'
import './ProductTable.css'
import { getBackendImageUrl } from '../../utils/backend-image'
import { Link } from 'react-router-dom'
import { useDeleteOneProduct } from '../../hooks/admin/useAdminProduct'
import { toast } from 'react-toastify'

export default function ProductTable() {
  const {
    data, error, isPending, products,
    pageNumber, setPageNumber,
    pagination, canNextPage, canPreviousPage,
    pageSize, setPageSize,
    search, setSearch
  } = useAdminProduct()

  const deleteOneProductHook = useDeleteOneProduct()
  const [deleteId, setDeleteId] = React.useState(null)

  if (error) return <>{error.message}</>

  const handlePrev = () => {
    if (canPreviousPage) setPageNumber(prev => prev - 1)
  }

  const handleNext = () => {
    if (canNextPage) setPageNumber(prev => prev + 1)
  }

  const handleSearch = (e) => {
    setPageNumber(1)
    setSearch(e.target.value)
  }

  const handleDelete = () => {
    deleteOneProductHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null)
        toast.success('Product deleted successfully')
      },
      onError: (err) => {
        toast.error('Failed to delete product: ' + (err?.message || 'Unknown error'))
      },
    })
  }

  return (
    <div className="product-table-container">
      <h2>Food Products</h2>
      <div className="controls">
        <label>Show</label>
        <select
          value={pagination.limit}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <label>Search:</label>
        <input
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Category</th>
            <th>Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => (
            <tr key={row._id}>
              <td>
                <img
                  className="product-image"
                  src={getBackendImageUrl(row.filepath)}
                  alt={row.name}
                  style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', background: '#f3f4f6', border: '1px solid #e5e7eb' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60?text=No+Image'; }}
                />
              </td>
              <td>{row.name}</td>
              <td>NPR {row.price}</td>
              <td>{row.type}</td>
              <td>{row.categoryId?.name || 'Unknown'}</td>
              <td>{row.restaurantId?.name || 'Unknown'}</td>
              <td>
                <Link to={`/admin/product/${row._id}/edit`}><button className="edit-btn">Edit</button></Link>
                <button onClick={() => setDeleteId(row._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4 flex items-center justify-between'>
        <button onClick={handlePrev} disabled={!canPreviousPage}>Back</button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button onClick={handleNext} disabled={!canNextPage}>Next</button>
      </div>
      {/* Simple delete confirmation */}
      {deleteId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <h3>Delete Confirmation</h3>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleDelete} className="delete-btn" style={{ marginRight: 12 }}>Delete</button>
            <button onClick={() => setDeleteId(null)} className="edit-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
