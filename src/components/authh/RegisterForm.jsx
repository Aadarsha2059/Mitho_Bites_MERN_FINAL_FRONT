import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUser } from "../../hooks/useRegisterUserTan";

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

// Password strength checker
const checkPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: '', color: '', suggestions: [] };
  
  let strength = 0;
  const suggestions = [];
  
  // Length check
  if (password.length >= 8) strength += 1;
  else suggestions.push('Use at least 8 characters');
  
  if (password.length >= 12) strength += 1;
  
  // Uppercase check
  if (/[A-Z]/.test(password)) strength += 1;
  else suggestions.push('Add uppercase letters (A-Z)');
  
  // Lowercase check
  if (/[a-z]/.test(password)) strength += 1;
  else suggestions.push('Add lowercase letters (a-z)');
  
  // Number check
  if (/[0-9]/.test(password)) strength += 1;
  else suggestions.push('Add numbers (0-9)');
  
  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  else suggestions.push('Add special characters (!@#$%^&*)');
  
  // Determine strength level
  let label, color, percentage;
  if (strength <= 2) {
    label = 'Weak';
    color = '#8B0000';
    percentage = 25;
  } else if (strength <= 4) {
    label = 'Fair';
    color = '#FFA500';
    percentage = 50;
  } else if (strength <= 5) {
    label = 'Good';
    color = '#FFD700';
    percentage = 75;
  } else {
    label = 'Strong';
    color = '#48bb78';
    percentage = 100;
  }
  
  return { strength, label, color, percentage, suggestions };
};

export default function RegisterForm() {
  const { mutateAsync: register, isLoading } = useRegisterUser();
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: '', color: '', percentage: 0, suggestions: [] });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await register(values);  
      toast.success("Registration successful! Welcome to BhokBhoj! 🎉");
      resetForm();
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-form-modal">
      <div className="signup-form-header">
        <div className="signup-icon">
          <span role="img" aria-label="welcome">🎉</span>
        </div>
        <h3 className="signup-subtitle">Join the BhokBhoj family!</h3>
      </div>

      <Formik
        initialValues={{
          fullname: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
          phone: "",
          address: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="user">👤</span>
                </div>
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
              <ErrorMessage
                name="fullname"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="username">🏷️</span>
                </div>
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
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="email">📧</span>
                </div>
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  className="floating-input"
                />
                <label htmlFor="email" className="floating-label">
                  Email
                </label>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="lock">🔒</span>
                </div>
                <Field
                  type="password"
                  name="password"
                  placeholder=" "
                  className="floating-input"
                >
                  {({ field, form }) => (
                    <input
                      {...field}
                      type="password"
                      placeholder=" "
                      className="floating-input"
                      onChange={(e) => {
                        field.onChange(e);
                        const strength = checkPasswordStrength(e.target.value);
                        setPasswordStrength(strength);
                      }}
                    />
                  )}
                </Field>
                <label htmlFor="password" className="floating-label">
                  Password
                </label>
              </div>
              
              {/* Password Strength Indicator */}
              {passwordStrength.label && (
                <div className="password-strength-container">
                  <div className="strength-bar-wrapper">
                    <div 
                      className="strength-bar-fill" 
                      style={{ 
                        width: `${passwordStrength.percentage}%`,
                        background: passwordStrength.color 
                      }}
                    />
                  </div>
                  <div className="strength-info">
                    <span className="strength-label" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label === 'Weak' && '🔴'}
                      {passwordStrength.label === 'Fair' && '🟠'}
                      {passwordStrength.label === 'Good' && '🟡'}
                      {passwordStrength.label === 'Strong' && '🟢'}
                      {' '}{passwordStrength.label}
                    </span>
                  </div>
                  
                  {/* Suggestions for weak passwords */}
                  {passwordStrength.suggestions.length > 0 && (
                    <div className="password-suggestions">
                      <div className="suggestion-header">
                        💡 <strong>Strengthen your password:</strong>
                      </div>
                      <ul className="suggestion-list">
                        {passwordStrength.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Strong password message */}
                  {passwordStrength.label === 'Strong' && (
                    <div className="password-strong-message">
                      ✅ <strong>Excellent!</strong> Your password is strong and secure.
                    </div>
                  )}
                </div>
              )}
              
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="confirm">✅</span>
                </div>
                <Field
                  type="password"
                  name="confirmpassword"
                  placeholder=" "
                  className="floating-input"
                />
                <label htmlFor="confirmpassword" className="floating-label">
                  Confirm Password
                </label>
              </div>
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="phone">📱</span>
                </div>
                <Field
                  type="tel"
                  name="phone"
                  placeholder=" "
                  className="floating-input"
                />
                <label htmlFor="phone" className="floating-label">
                  Phone
                </label>
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <span role="img" aria-label="location">📍</span>
                </div>
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
              <ErrorMessage
                name="address"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <>
                  <span role="img" aria-label="loading">⏳</span> Creating Account...
                </>
              ) : (
                <>
                  <span role="img" aria-label="arrow">➡️</span> Create Account
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

