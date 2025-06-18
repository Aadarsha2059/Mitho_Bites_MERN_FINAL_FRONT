import React from "react";
import { useGetOneCategory } from "../../hooks/admin/useAdminCategory";
import { useParams } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/backend-image";
import "./ViewCategory.css";

export default function ViewCategory() {
  const { id } = useParams();
  const { category, error, isPending } = useGetOneCategory(id);

  if (isPending) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error.message}</div>;

  return (
    <div className="view-category-container">
      <h2 className="category-title">Category Details</h2>
      <div className="category-card">
        <img
          src={getBackendImageUrl(category.filepath)}
          alt={category.name}
          className="category-image"
        />
        <p className="category-name">{category.name}</p>
      </div>
    </div>
  );
}
