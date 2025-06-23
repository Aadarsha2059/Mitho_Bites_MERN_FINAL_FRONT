import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../auth/authProvider';
import axios from '../../../api/api';
import './ProfilePage.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';

const ProfileSchema = Yup.object().shape({
  fullname: Yup.string().required('Full name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string(),
  currentPassword: Yup.string(),
});

export default function ProfilePage({ onBack }) {
  const { user, login } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user) return <div className="profile-loading">Loading...</div>;

  const initialValues = {
    fullname: user.fullname || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    password: '',
    currentPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    setError('');
    try {
      const updateData = {};
      Object.keys(initialValues).forEach((key) => {
        if (key === 'password' && !values.password) return;
        if (values[key] !== initialValues[key] && values[key] !== '') {
          updateData[key] = values[key];
        }
      });
      updateData.fullname = values.fullname;
      updateData.phone = values.phone;
      updateData.address = values.address;
      if ((values.email !== initialValues.email || values.password) && !values.currentPassword) {
        setError('Current password is required to change email or password.');
        setSubmitting(false);
        return;
      }
      if (values.currentPassword) {
        updateData.currentPassword = values.currentPassword;
      }
      const res = await axios.put(`/admin/users/${user._id}`, updateData);
      if (res.data.success) {
        const token = localStorage.getItem('token');
        login(res.data.user, token);
        setMessage('Profile updated successfully!');
        setError('');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setError(res.data.message || 'Update failed');
        setMessage('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section profile-section">
      <div className="profile-card">
        <div className="profile-header-row">
          <div className="profile-header-left">
            <FaUserCircle size={36} style={{ marginRight: 10, color: '#b81736' }} />
            <span className="profile-title">Update Profile</span>
          </div>
          <button className="profile-back-btn" onClick={onBack} title="Back">
            <FaArrowLeft size={22} />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <Field name="fullname" type="text" />
                <ErrorMessage name="fullname" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label>Username</label>
                <Field name="username" type="text" disabled />
              </div>
              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <Field name="phone" type="text" />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <Field name="address" type="text" />
                <ErrorMessage name="address" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <Field name="password" type="password" autoComplete="new-password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              {(values.email !== initialValues.email || values.password !== '') && (
                <div className="form-group">
                  <label>Current Password <span className="required">*</span></label>
                  <Field name="currentPassword" type="password" autoComplete="current-password" />
                  <ErrorMessage name="currentPassword" component="div" className="error-message" />
                </div>
              )}
              {error && <div className="error-message">{error}</div>}
              {message && <div className="success-message">{message}</div>}
              <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
