import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useGetOneRestaurant, useUpdateOneRestaurant } from '../../hooks/admin/useAdminRestaurant';
import { getBackendImageUrl } from '../../utils/backend-image';

export default function UpdateRestaurant() {
  const { id } = useParams();
  const { restaurant, isLoading: isFetching } = useGetOneRestaurant(id);
  const { mutate, isPending } = useUpdateOneRestaurant();

  const validationSchema = Yup.object({
    name: Yup.string().required('Restaurant name is required'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Type is required'),
    image: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: restaurant?.name || '',
      location: restaurant?.location || '',
      type: restaurant?.type || '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('location', values.location);
      formData.append('type', values.type);
      if (values.image) formData.append('image', values.image);
      mutate({ id, data: formData }, { onSuccess: () => formik.resetForm() });
    },
  });

  if (isFetching) return <div>Loading restaurant data...</div>;

  return (
    <div className="update-category-container">
      <h2 className="form-title">Update Restaurant</h2>
      <form onSubmit={formik.handleSubmit} className="update-category-form">
        <label htmlFor="name">Restaurant Name</label>
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

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.location}
          className="form-input"
        />
        {formik.touched.location && formik.errors.location && (
          <div className="form-error">{formik.errors.location}</div>
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

        <label htmlFor="image">Restaurant Image</label>
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
              src={getBackendImageUrl(restaurant?.filepath)}
              alt="Existing"
            />
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>Update</button>
      </form>
    </div>
  );
} 