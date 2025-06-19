import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import {
  useGetOneUser,
  useUpdateOneUser,
} from '../../hooks/admin/useAdminUser';
import './UpdateUser.css';

export default function UpdateUser() {
  const { id } = useParams();
  const { user, isLoading: isFetching } = useGetOneUser(id);
  const { mutate, isPending } = useUpdateOneUser();

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
    enableReinitialize: true,
    initialValues: {
      fullname: user?.fullname || '',
      username: user?.username || '',
      password: user?.password || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        { id, data: values },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

  if (isFetching) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="update-user-container">
      <h2 className="update-user-title">Update User | Mitho Bites</h2>
      <form className="update-user-form" onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="fullname"
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
            className="form-textarea"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="form-error">{formik.errors.address}</div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
}
