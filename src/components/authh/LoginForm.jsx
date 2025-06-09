// // components/authh/LoginForm.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../auth/authProvider';

// const LoginForm = () => {
//   const { setUser } = useContext(AuthContext); 
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }
//     setError('');
//     setIsSubmitting(true);

//     // Simulate login process
//     setTimeout(() => {
//       // Simulated user authentication
//       const dummyUser = { username };
//       setUser(dummyUser); // Set user in AuthContext
//       console.log('Logged in as:', username);
//       setIsSubmitting(false);
//       navigate('/dashboard');
//     }, 1000);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="login-form">
//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </div>
//       <div className="input-group password-group">
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <a href="/forgot-password" className="forgot-password">Forgot password?</a>
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       <button type="submit" className="login-btn" disabled={isSubmitting}>
//         {isSubmitting ? 'Logging in...' : 'Login'}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;


// import React from 'react'
// import { useFormik } from 'formik'
// import * as Yup from "yup"
// import { useLoginUser } from '../../hooks/useLoginUser'

// export default function LoginForm() {
//   const { mutate, data, error, isPending } = useLoginUser()
//   const validationSchema = Yup.object(
//     {
//       username: Yup.string().required("Please fill username"),
//       password: Yup.string().min(6, "Password needs 6 character")
//         .required("Please fill the password")

//     }
//   )
//   const formik = useFormik(
//     {
//       initialValues: {
//         //states
//         username: "",
//         password: ""
//       },
//       validationSchema,
//       onSubmit: (values) => {
//         //values automatically create the object of value states
//         mutate(values)


//       }
//     }


//   )


//   return (
//     <div>LoginForm
//       <form onSubmit={formik.handleSubmit}>
//         <lable>Username</lable>
//         <input
//           type='username'
//           name='username'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         ></input>
//         {formik.touched.username && formik.errors.username &&
//           <p>{formik.errors.username}</p>

//         }
//         <input
//           type='password'
//           name='password'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         ></input>

//         {
//           formik.touched.password && formik.errors.password &&
//           <p>{formik.errors.password}</p>
//         }
//         <button type='submit'>Login</button>

//       </form>
//     </div>
//   )
// }



// components/authh/LoginForm.jsx
import './LoginForm.css'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const { mutate, data, error, isPending } = useLoginUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !error) {
      navigate('/dashboard')
    }
  }, [data, error, navigate])

  const validationSchema = Yup.object({
    username: Yup.string().required('Please fill username'),
    password: Yup.string().min(6, 'Password needs 6 characters').required('Please fill the password'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter your username"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="error-message">{formik.errors.username}</p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-message">{formik.errors.password}</p>
        )}
      </div>

      <button type="submit" className="login-btn" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      {error && (
        <p className="error-message" style={{ textAlign: 'center' }}>
          Login failed. Please try again.
        </p>
      )}
    </form>
  )
}
