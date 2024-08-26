// src/pages/EmployeeLoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // تأكد من أنك تستورد ملف CSS

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bokame-swpksvvn.b4a.run/api/auth/login', { email, password });
      console.log(response);
      localStorage.setItem('employeeToken', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('role', response.data.user.role);
      navigate('/employee');
    } catch (error) {
      console.error(error.response.data);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center text-danger">تسجيل دخول الموظفين</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='text-info'>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-info">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
