import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRegisterUser } from "../../hooks/useRegisterUser";

export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { register } = useRegisterUser();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!fullname || !username || !password || !confirmPassword || !phone || !address) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(username)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = { fullname, username, password, phone, address };
    const result = await register(formData);

    if (result) {
      toast.success("Registration successful");
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="signup-form">
      <div className="form-group">
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="fullname" className="floating-label">Full Name</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="username" className="floating-label">Email</label>
      </div>

      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="password" className="floating-label">Password</label>
      </div>

      <div className="form-group">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
      </div>

      <div className="form-group">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="phone" className="floating-label">Phone</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
        />
        <label htmlFor="address" className="floating-label">Address</label>
      </div>

      <button className="signup-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
