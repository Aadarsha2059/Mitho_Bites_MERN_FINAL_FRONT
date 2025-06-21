import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateRestaurant } from '../../hooks/admin/useAdminRestaurant'
import './CreateRestaurant.css'

export default function CreateRestaurant() {
  const { mutate, isPending } = useCreateRestaurant()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    contact: Yup.string().required("Contact is required"),
    image: Yup.mixed().nullable().test(
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
    <div className="create-restaurant-container">
      <h2 className="create-restaurant-title">Restaurant - Food | Mitho Bites</h2>

      <form className="create-restaurant-form" onSubmit={formik.handleSubmit}>

        {/* Restaurant Name */}
        <div className="form-group">
          <label className="form-label">
            Restaurant Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Mitho Bites Restaurant"
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
            accept="image/*"
            className="form-input-file"
            onChange={(e) => {
              const file = e.currentTarget.files[0]
              if (file) formik.setFieldValue("image", file)
            }}
            onBlur={formik.handleBlur}
          />
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
  )
} 