import React, { useEffect, useState, useContext } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash, FaUserCircle, FaSave, FaCheck, FaEdit, FaUserEdit } from 'react-icons/fa';
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

const UpdateProfile = ({ onClose }) => {
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
    <div style={{
      width: '100%',
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #fff3e0 100%)',
      borderRadius: '1.5rem',
      minHeight: '400px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        padding: '32px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '24px',
          justifyContent: 'center'
        }}>
          <FaUserEdit style={{ fontSize: '2rem', color: '#ff9800' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '2rem',
            color: '#ff9800',
            letterSpacing: '1px'
          }}>Update Profile</h2>
        </div>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '28px',
          fontWeight: 500
        }}>Edit your information one field at a time</p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
            {['fullname', 'username', 'email', 'phone', 'address', 'password'].map((field) => (
              <div key={field} style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: editingField === field ? '16px' : '0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flex: 1
                  }}>
                    <span style={{ color: '#ff9800', fontSize: '1.2rem' }}>
                      {field === 'fullname' && <FaUserCircle />} 
                      {field === 'username' && <FaUser />} 
                      {field === 'email' && <FaEnvelope />} 
                      {field === 'phone' && <FaPhone />} 
                      {field === 'address' && <FaMapMarkerAlt />} 
                      {field === 'password' && <FaLock />}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666', minWidth: '100px' }}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                  </div>
                  {editingField !== field && (
                    <>
                      <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333',
                        flex: 1,
                        textAlign: 'right',
                        marginRight: '12px'
                      }}>
                        {field === 'password' ? '••••••••' : user[field] || 'Not provided'}
                      </span>
                      <button
                        onClick={() => handleEdit(field)}
                        style={{
                          background: '#ff9800',
                          border: 'none',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ff6f00';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ff9800';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                    </>
                  )}
                </div>
                {editingField === field && (
                  <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {field !== 'password' ? (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={fieldValue}
                          onChange={e => setFieldValue(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '1rem',
                            outline: 'none',
                            minWidth: '200px'
                          }}
                          required
                        />
                      ) : (
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={fieldValue}
                          onChange={e => setFieldValue(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '1rem',
                            outline: 'none',
                            minWidth: '200px'
                          }}
                          required
                          placeholder="New Password"
                        />
                      )}
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '2px solid #e0e0e0',
                          fontSize: '1rem',
                          outline: 'none',
                          minWidth: '200px'
                        }}
                        required
                        placeholder="Current Password"
                      />
                      {field === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            padding: '12px 16px',
                            background: '#f0f0f0',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: '#666'
                          }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                          padding: '10px 20px',
                          background: '#f0f0f0',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#666',
                          fontWeight: 600
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        style={{
                          padding: '10px 20px',
                          background: isPending ? '#ccc' : '#ff9800',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: isPending ? 'not-allowed' : 'pointer',
                          color: '#fff',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <FaSave /> {isPending ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
            {successMsg && (
              <div style={{
                background: '#d4edda',
                color: '#155724',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #c3e6cb',
                marginTop: '16px',
                fontWeight: 600
              }}>{successMsg}</div>
            )}
            {errorMsg && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #f5c6cb',
                marginTop: '16px',
                fontWeight: 600
              }}>{errorMsg}</div>
            )}
          </div>
      </div>
    </div>
  );
};

export default UpdateProfile; 
