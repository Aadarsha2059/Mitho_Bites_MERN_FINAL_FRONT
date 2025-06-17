import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateUser } from '../../hooks/admin/useAdminUseradd'; 
import './CreateUser.css';

export default function CreateUser() {
  const { mutate, isPending } = useCreateUser();

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, 'Full Name must be at least 3 characters')
      .required('Full Name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    phone: Yup.string()
      .matches(
        /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,15}$/,
        'Phone number is not valid'
      )
      .required('Phone number is required'),
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
      phone: '',
      address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => formik.resetForm(),
      });
    },
  });

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Create New User | Mitho Bites</h2>

      <form className="create-user-form" onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="fullname"
            placeholder="e.g. John Doe"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullname}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <div className="form-error">{formik.errors.fullname}</div>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label className="form-label">
            Username <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="e.g. johndoe123"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="form-error">{formik.errors.username}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">
            Password <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="form-error">{formik.errors.password}</div>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">
            Phone <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="+977-98XXXXXXXX"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="form-error">{formik.errors.phone}</div>
          )}
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="form-label">
            Address <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            name="address"
            placeholder="Enter full address"
            className="form-textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            rows={3}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="form-error">{formik.errors.address}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}
