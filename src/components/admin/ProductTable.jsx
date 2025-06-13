import React from 'react'
import { useAdminProduct } from '../../hooks/admin/useAdminProduct'
import './ProductTable.css'

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
      <h2>Food Products Table</h2>

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

      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Restaurant</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((row) => (
              <tr key={row._id}>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>{row.type}</td>
                <td>{row.restaurant}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className='mt-4 flex items-center justify-between'>
        <button onClick={handlePrev} disabled={!canPreviousPage}>Back</button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button onClick={handleNext} disabled={!canNextPage}>Next</button>
      </div>
    </div>
  )
}
