import React from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

export default function RegisterForm() {
  const { mutateAsync: register, isLoading } = useRegisterUser();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await register(values);  
      toast.success("Registration successful");
      resetForm();
    } catch (error) {
      
      toast.error("Registration failed");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-form">
      <Formik
        initialValues={{
          fullname: "",
          username: "",
          password: "",
          confirmpassword: "",
          phone: "",
          address: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field
                type="text"
                name="fullname"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="fullname" className="floating-label">
                Full Name
              </label>
              <ErrorMessage
                name="fullname"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                name="username"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="username" className="floating-label">
                Username
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="password"
                name="confirmpassword"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="confirmpassword" className="floating-label">
                Confirm Password
              </label>
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="tel"
                name="phone"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="phone" className="floating-label">
                Phone
              </label>
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                name="address"
                placeholder=" "
                className="floating-input"
              />
              <label htmlFor="address" className="floating-label">
                Address
              </label>
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
              {isSubmitting || isLoading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
