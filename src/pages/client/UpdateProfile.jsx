import React, { useEffect, useState, useContext } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash, FaUserCircle, FaSave, FaCheck } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { AuthContext } from '../../auth/authProvider';
import './UpdateProfile.css';

const UpdateProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,15}$/, 'Phone number is not valid')
    .required('Phone is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  currentPassword: Yup.string()
    .when(['email', 'newPassword'], {
      is: (email, newPassword) => email || newPassword,
      then: (schema) => schema.required('Current password is required for sensitive changes'),
      otherwise: (schema) => schema.optional(),
    }),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .when('newPassword', {
      is: (newPassword) => newPassword,
      then: (schema) => schema.required('Please confirm your new password'),
      otherwise: (schema) => schema.optional(),
    }),
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log('UpdateProfile mounted, user:', user);
  }, [user]);

  if (!user) {
    return (
      <div className="update-profile-page-full">
        <div className="update-profile-background">
          <div className="update-profile-background-overlay"></div>
        </div>
        <div className="update-profile-content">
          <h2 className="update-profile-title">Update Profile</h2>
          <p className="update-profile-subtitle">Loading user information...</p>
          <div className="update-profile-card">
            <div className="spinner" style={{margin:'2rem auto',width:48,height:48,border:'6px solid #eee',borderTop:'6px solid #764ba2',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
            <style>{`@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
          </div>
        </div>
      </div>
    );
  }

  // Initialize form values with current user data
  const initialValues = {
    fullname: user?.fullname || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted with values:', values);
    
    const updateData = {
      fullname: values.fullname,
      username: values.username,
      phone: values.phone,
      address: values.address,
    };

    // Add email if changed
    if (values.email !== user?.email) {
      updateData.email = values.email;
      updateData.currentPassword = values.currentPassword;
    }

    // Add password if provided
    if (values.newPassword) {
      updateData.password = values.newPassword;
      updateData.currentPassword = values.currentPassword;
    }

    console.log('Sending update data:', updateData);

    updateProfile(updateData, {
      onSuccess: (data) => {
        console.log('Update successful:', data);
        setSubmitting(false);
        // Reset password fields after successful update
        resetForm({
          values: {
            ...values,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }
        });
      },
      onError: (error) => {
        console.error('Update failed:', error);
        setSubmitting(false);
      }
    });
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  console.log('Rendering UpdateProfile with user:', user);

  return (
    <div className="update-profile-page-full">
      <div className="update-profile-background">
        <div className="update-profile-background-overlay"></div>
      </div>
      
      <button className="update-profile-back-btn" onClick={handleBack} title="Back to Dashboard">
        <FaArrowLeft />
        <span>Back</span>
      </button>
      
      <div className="update-profile-content">
        <h2 className="update-profile-title">Update Profile</h2>
        <p className="update-profile-subtitle">Keep your information up to date</p>
        
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="update-profile-form">
              {/* Basic Information Section */}
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-group">
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Field
                      type="text"
                      name="fullname"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="fullname" className="floating-label">
                      Full Name
                    </label>
                  </div>
                  <ErrorMessage name="fullname" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Field
                      type="text"
                      name="username"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="username" className="floating-label">
                      Username
                    </label>
                  </div>
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <Field
                      type="email"
                      name="email"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="email" className="floating-label">
                      Email Address
                    </label>
                  </div>
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <Field
                      type="text"
                      name="phone"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="phone" className="floating-label">
                      Phone Number
                    </label>
                  </div>
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaMapMarkerAlt className="input-icon" />
                    <Field
                      type="text"
                      name="address"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="address" className="floating-label">
                      Address
                    </label>
                  </div>
                  <ErrorMessage name="address" component="div" className="error-message" />
                </div>
              </div>

              {/* Security Section */}
              <div className="form-section">
                <h3 className="section-title">Security Settings</h3>
                
                <div className="form-group">
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="currentPassword" className="floating-label">
                      Current Password (required for sensitive changes)
                    </label>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage name="currentPassword" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="newPassword" className="floating-label">
                      New Password (optional)
                    </label>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage name="newPassword" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder=" "
                      className="floating-input"
                    />
                    <label htmlFor="confirmPassword" className="floating-label">
                      Confirm New Password
                    </label>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>
              </div>

              <button
                type="submit"
                className="update-profile-submit-btn"
                disabled={isPending || isSubmitting}
              >
                {isPending || isSubmitting ? (
                  <>
                    <div className="spinner" style={{width:16,height:16,border:'2px solid #fff',borderTop:'2px solid transparent',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave style={{ marginRight: 8 }} />
                    Update Profile
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile; 