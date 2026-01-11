import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateCategory } from '../../hooks/admin/useAdminCategory'
import './CreateCategory.css'

export default function CreateCategory() {
  const { mutate, isPending } = useCreateCategory()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
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
      image: null
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("name", values.name)
      if (values.image) formData.append("image", values.image)

      mutate(formData, {
        onSuccess: () => formik.resetForm()
      })
    }
  })

  return (
    <div className="create-category-container">
      <h2 className="create-category-title">Category - Food | BhokBhoj</h2>

      <form className="create-category-form" onSubmit={formik.handleSubmit}>

        {/* Category Name */}
        <div className="form-group">
          <label className="form-label">
            Category Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Fast Food"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="form-error">{formik.errors.name}</div>
          )}
        </div>

        {/* Category Image */}
        <div className="form-group">
          <label className="form-label">Category Image</label>
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
          {isPending ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  )
}


