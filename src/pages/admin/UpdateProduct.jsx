import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useGetOneProduct, useUpdateOneProduct } from '../../hooks/admin/useAdminProduct';
import { useAdminCategory } from '../../hooks/admin/useAdminCategory';
import { useAdminRestaurant } from '../../hooks/admin/useAdminRestaurant';
import { getBackendImageUrl } from '../../utils/backend-image';

export default function UpdateProduct() {
  const { id } = useParams();
  const { product, isLoading: isFetching } = useGetOneProduct(id);
  const { categories } = useAdminCategory();
  const { restaurants } = useAdminRestaurant();
  const { mutate, isPending } = useUpdateOneProduct();

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().min(1, 'Price must be at least 1').required('Price is required'),
    categoryId: Yup.string().required('Category is required'),
    restaurantId: Yup.string().required('Restaurant is required'),
    type: Yup.string().required('Type is required'),
    image: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      price: product?.price || '',
      categoryId: product?.categoryId?._id || '',
      restaurantId: product?.restaurantId?._id || '',
      type: product?.type || '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('categoryId', values.categoryId);
      formData.append('restaurantId', values.restaurantId);
      formData.append('type', values.type);
      if (values.image) formData.append('image', values.image);
      mutate({ id, data: formData }, { onSuccess: () => formik.resetForm() });
    },
  });

  if (isFetching) return <div>Loading product data...</div>;

  return (
    <div className="update-category-container">
      <h2 className="form-title">Update Product</h2>
      <form onSubmit={formik.handleSubmit} className="update-category-form">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="form-input"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="form-error">{formik.errors.name}</div>
        )}

        <label htmlFor="price">Price (NPR)</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="form-input"
        />
        {formik.touched.price && formik.errors.price && (
          <div className="form-error">{formik.errors.price}</div>
        )}

        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          onChange={formik.handleChange}
          value={formik.values.categoryId}
          className="form-input"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <div className="form-error">{formik.errors.categoryId}</div>
        )}

        <label htmlFor="restaurantId">Restaurant</label>
        <select
          id="restaurantId"
          name="restaurantId"
          onChange={formik.handleChange}
          value={formik.values.restaurantId}
          className="form-input"
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((res) => (
            <option key={res._id} value={res._id}>{res.name}</option>
          ))}
        </select>
        {formik.touched.restaurantId && formik.errors.restaurantId && (
          <div className="form-error">{formik.errors.restaurantId}</div>
        )}

        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          className="form-input"
        >
          <option value="">Select type</option>
          <option value="Indian">Indian</option>
          <option value="Nepali">Nepali</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <div className="form-error">{formik.errors.type}</div>
        )}

        <label htmlFor="image">Product Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) formik.setFieldValue('image', file);
          }}
          className="form-input"
        />
        {formik.touched.image && formik.errors.image && (
          <div className="form-error">{formik.errors.image}</div>
        )}

        <div className="image-preview">
          {formik.values.image ? (
            <img
              className="preview-img"
              src={URL.createObjectURL(formik.values.image)}
              alt="Selected Preview"
            />
          ) : (
            <img
              className="preview-img"
              src={getBackendImageUrl(product?.filepath)}
              alt="Existing"
            />
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>Update</button>
      </form>
    </div>
  );
} 