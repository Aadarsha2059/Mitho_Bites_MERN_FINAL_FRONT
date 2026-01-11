import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UpdateCategory.css';

import { useGetOneCategory, useUpdateOneCategory } from '../../hooks/admin/useAdminCategory';
import { useParams } from 'react-router-dom';
import { getBackendImageUrl } from '../../utils/backend-image';

export default function UpdateCategory() {
  const { id } = useParams();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    image: Yup.mixed()
      .nullable()
      .test('fileType', 'Only JPG & PNG files are allowed', (value) => 
        !value || (value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type))
      )
      .test('fileSize', 'File size must be less than 5MB', (value) => 
        !value || value.size <= 5 * 1024 * 1024
      ),
  });

  const categoryOne = useGetOneCategory(id);
  const UpdateCategory = useUpdateOneCategory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryOne.category?.name || '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.image) formData.append('image', values.image);

      UpdateCategory.mutate(
        { id, data: formData },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

  return (
    <div className="update-category-container">
      <h2 className="form-title">Update Category</h2>
      <form onSubmit={formik.handleSubmit} className="update-category-form">
        <label htmlFor="name">Category Name</label>
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

        <label htmlFor="image">Category Image</label>
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
              src={getBackendImageUrl(categoryOne.category?.filepath)}
              alt="Existing"
            />
          )}
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
}

