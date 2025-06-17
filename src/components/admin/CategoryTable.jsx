import React from 'react'
import { useAdminCategory } from '../../hooks/admin/useAdminCategory'
import { getBackendImageUrl } from '../../utils/backend-image'
import './CategoryTable.css'

export default function CategoryTable() {
  const { categories, error, isPending } = useAdminCategory()

  if (isPending) return <div className="loading">Loading categories...</div>
  if (error) return <div className="error">Failed to load categories</div>

  return (
    <div className="category-table-container">
      <h2 className="category-table-heading">Available Categories on Mitho Bites</h2>
      <div className="categories-grid">
        {categories.map((row) => (
          <div className="category-card-container" key={row._id}>
            <img
              className="category-image"
              src={getBackendImageUrl(row.filepath)}
              alt={row.name}
              loading="lazy"
            />
            <h3 className="category-name">{row.name}</h3>
            <p className="category-description">
              Freshly prepared {row.name.toLowerCase()} to satisfy your cravings.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
