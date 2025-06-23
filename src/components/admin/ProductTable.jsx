import React from 'react'
import { useAdminProduct } from '../../hooks/admin/useAdminProduct'
import './ProductTable.css'
import { getBackendImageUrl } from '../../utils/backend-image'

export default function ProductTable() {
  const {
    data, error, isPending, products,
    pageNumber, setPageNumber,
    pagination, canNextPage, canPreviousPage,
    pageSize, setPageSize,
    search, setSearch
  } = useAdminProduct()

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
      <div className="product-grid">
        {products.map((row) => (
          <div className="product-card" key={row._id}>
            <img
              className="product-image"
              src={getBackendImageUrl(row.filepath)}
              alt={row.name}
              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/120?text=No+Image'; }}
            />
            <div className="product-info">
              <h3 className="product-name">{row.name}</h3>
              <p className="product-desc">NPR {row.price} | {row.type}</p>
              <p className="product-meta">
                <span>Category: {row.categoryId?.name || 'Unknown'}</span><br/>
                <span>Restaurant: {row.restaurantId?.name || 'Unknown'}</span><br/>
                <span>Location: {row.restaurantId?.location || 'N/A'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <button onClick={handlePrev} disabled={!canPreviousPage}>Back</button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button onClick={handleNext} disabled={!canNextPage}>Next</button>
      </div>
    </div>
  )
}
