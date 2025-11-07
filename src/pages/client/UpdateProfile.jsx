import React, { useEffect, useState, useContext } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash, FaUserCircle, FaSave, FaCheck, FaEdit } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { AuthContext } from '../../auth/AuthProvider';
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
  const { user, setUser } = useContext(AuthContext);
  const { mutate: updateProfile, isPending } = useUpdateProfile(user, setUser);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (editingField && user) {
      setFieldValue(user[editingField] || '');
    }
  }, [editingField, user]);

  if (!user) {
    return (
      <div className="update-profile-page-full update-profile-floating-bg">
        <div className="update-profile-background">
          <div className="update-profile-background-overlay"></div>
        </div>
        <div className="update-profile-floating-container">
          <div className="update-profile-content">
            <h2 className="update-profile-title">Update Profile</h2>
            <p className="update-profile-subtitle">Loading user information...</p>
            <div className="update-profile-card">
              <div className="spinner" style={{margin:'2rem auto',width:48,height:48,border:'6px solid #eee',borderTop:'6px solid #764ba2',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
              <style>{`@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (field) => {
    setEditingField(field);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setFieldValue('');
    setCurrentPassword('');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    if (!currentPassword) {
      setErrorMsg('Current password is required.');
      return;
    }
    const updateData = { currentPassword };
    if (editingField === 'password') {
      updateData.password = fieldValue;
    } else {
      updateData[editingField] = fieldValue;
    }
    updateProfile(updateData, {
      context: {
        onError: (error) => {
          setErrorMsg(error.message || 'Failed to update profile');
        }
      },
      onSuccess: (data) => {
        setSuccessMsg('Profile updated successfully!');
        setEditingField(null);
        setFieldValue('');
        setCurrentPassword('');
      },
      onError: (error) => {
        setErrorMsg(error.message || 'Failed to update profile');
      }
    });
  };

  console.log('Rendering UpdateProfile with user:', user);

  return (
    <div className="update-profile-page-full update-profile-floating-bg">
      <div className="update-profile-background">
        <div className="update-profile-background-overlay"></div>
      </div>
      <div className="update-profile-floating-container">
        <div className="update-profile-content">
          <h2 className="update-profile-title">Update Profile</h2>
          <p className="update-profile-subtitle">Edit your information one field at a time</p>
          <div className="update-profile-fields-list">
            {['fullname', 'username', 'email', 'phone', 'address', 'password'].map((field) => (
              <div className="update-profile-field-row" key={field}>
                <span className="update-profile-field-label">
                  {field === 'fullname' && <FaUserCircle />} 
                  {field === 'username' && <FaUser />} 
                  {field === 'email' && <FaEnvelope />} 
                  {field === 'phone' && <FaPhone />} 
                  {field === 'address' && <FaMapMarkerAlt />} 
                  {field === 'password' && <FaLock />} 
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
                {editingField === field ? (
                  <form className="update-profile-inline-form" onSubmit={handleSubmit}>
                    {field !== 'password' ? (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={fieldValue}
                        onChange={e => setFieldValue(e.target.value)}
                        className="update-profile-inline-input"
                        required
                      />
                    ) : (
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={fieldValue}
                        onChange={e => setFieldValue(e.target.value)}
                        className="update-profile-inline-input"
                        required
                        placeholder="New Password"
                      />
                    )}
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="update-profile-inline-input"
                      required
                      placeholder="Current Password"
                      style={{marginLeft:8}}
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button type="submit" className="update-profile-inline-save"><FaSave /></button>
                    <button type="button" className="update-profile-inline-cancel" onClick={handleCancel}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className="update-profile-field-value">
                      {field === 'password' ? '••••••••' : user[field] || 'Not provided'}
                    </span>
                    <button className="update-profile-inline-edit" onClick={() => handleEdit(field)}><FaEdit /></button>
                  </>
                )}
              </div>
            ))}
            {successMsg && <div className="update-profile-success-msg">{successMsg}</div>}
            {errorMsg && <div className="update-profile-error-msg">{errorMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile; 
