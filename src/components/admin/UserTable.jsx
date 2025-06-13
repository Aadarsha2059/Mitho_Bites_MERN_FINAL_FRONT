import React from 'react'
import { useAdminUser } from '../../hooks/admin/useAdminUser'
import './UserTable.css'

export default function UserTable() {
  const {
    data, error, isPending, users,
    pageNumber, setPageNumber,
    pagination, canNextPage, canPreviousPage,
    pageSize, setPageSize,
    search, setSearch
  } = useAdminUser()

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
    <div className="user-table-container">
      <h2> Mitho Bites User Table</h2>

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
            <th>Full Name</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((row) => (
              <tr key={row._id}>
                <td>{row.fullname}</td>
                <td>{row.username}</td>
                <td>{row.password}</td>
                <td>{row.phone}</td>
                <td>{row.address}</td>
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
