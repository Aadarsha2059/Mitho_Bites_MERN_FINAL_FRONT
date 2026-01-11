import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UpdateCategory.css';

import { useGetOneRestaurant, useUpdateOneRestaurant } from '../../hooks/admin/useAdminRestaurant';
import { useParams } from 'react-router-dom';

export default function UpdateRestaurant() {
  const { id } = useParams();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    location: Yup.string().required('Location required'),
    contact: Yup.string().required('Contact required'),
    image: Yup.mixed()
      .nullable()
      .test('fileType', 'Only JPG & PNG files are allowed', (value) => 
        !value || (value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type))
      )
      .test('fileSize', 'File size must be less than 5MB', (value) => 
        !value || value.size <= 5 * 1024 * 1024
      ),
  });

  const restaurantOne = useGetOneRestaurant(id);
  const updateRestaurant = useUpdateOneRestaurant();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: restaurantOne.restaurant?.name || '',
      location: restaurantOne.restaurant?.location || '',
      contact: restaurantOne.restaurant?.contact || '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('location', values.location);
      formData.append('contact', values.contact);
      if (values.image) formData.append('image', values.image);

      updateRestaurant.mutate(
        { id, data: formData },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

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

        <label htmlFor="contact">Contact</label>
        <input
          id="contact"
          name="contact"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contact}
          className="form-input"
        />
        {formik.touched.contact && formik.errors.contact && (
          <div className="form-error">{formik.errors.contact}</div>
        )}

        <label htmlFor="image">Restaurant Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) formik.setFieldValue('image', file);
          }}
          className="form-input"
        />
        <small style={{ color: '#666', fontSize: '0.875rem', display: 'block', marginTop: '0.5rem' }}>
          * Only JPG & PNG files allowed. Max size: 5MB
        </small>
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
              src={restaurantOne.restaurant?.image}
              alt="Existing"
            />
          )}
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
} 
