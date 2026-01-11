import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateRestaurant } from '../../hooks/admin/useAdminRestaurant'
import './CreateRestaurant.css'
import { useNavigate } from 'react-router-dom';

export default function CreateRestaurant() {
  const { mutate, isPending } = useCreateRestaurant()
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    contact: Yup.string().required("Contact is required"),
    image: Yup.mixed().nullable()
      .test(
        "fileType",
        "Only JPG & PNG files are allowed",
        (value) => !value || (value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type))
      )
      .test(
        "fileSize",
        "File size must be less than 5MB",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      )
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      contact: '',
      image: null
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("location", values.location)
      formData.append("contact", values.contact)
      if (values.image) formData.append("image", values.image)

      mutate(formData, {
        onSuccess: () => formik.resetForm()
      })
    }
  })

  return (
    <div className="create-restaurant-bg">
      <button
        className="admin-back-button"
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          zIndex: 100,
          background: 'linear-gradient(135deg, #5a3fd7, #7c5dfa)',
          color: 'white',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(90,63,215,0.13)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
        onClick={() => navigate('/admin/adminpage')}
      >
        ← Back
      </button>
      <div className="create-restaurant-container">
        <h2 className="create-restaurant-title">Restaurant - Food | BhokBhoj</h2>

        <form className="create-restaurant-form" onSubmit={formik.handleSubmit}>

          {/* Restaurant Name */}
          <div className="form-group">
            <label className="form-label">
              Restaurant Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. BhokBhoj Restaurant"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="form-error">{formik.errors.name}</div>
            )}
          </div>

          {/* Restaurant Location */}
          <div className="form-group">
            <label className="form-label">
              Location <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Kathmandu, Nepal"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="form-error">{formik.errors.location}</div>
            )}
          </div>

          {/* Restaurant Contact */}
          <div className="form-group">
            <label className="form-label">
              Contact <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="contact"
              placeholder="e.g. +977-1-1234567"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="form-error">{formik.errors.contact}</div>
            )}
          </div>

          {/* Restaurant Image */}
          <div className="form-group">
            <label className="form-label">Restaurant Image</label>
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/jpg,image/png"
              className="form-input-file"
              onChange={(e) => {
                const file = e.currentTarget.files[0]
                if (file) formik.setFieldValue("image", file)
              }}
              onBlur={formik.handleBlur}
            />
            <small style={{ color: '#666', fontSize: '0.875rem', display: 'block', marginTop: '0.5rem' }}>
              * Only JPG & PNG files allowed. Max size: 5MB
            </small>
            {formik.touched.image && formik.errors.image && (
              <div className="form-error">{formik.errors.image}</div>
            )}
          </div>

          {/* Image Preview */}
          {formik.values.image && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                className="preview-image"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  )
} 

