import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import baseURL from './baseurl';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType: 'intern', 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        window.alert('Login successful');

        // Redirect to intern portal
        navigate('/intern');
      } else {
        console.error('Login failed:', data.message);
        window.alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      window.alert('Error during login');
    }
  };

  return (
    <div className="container2">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
        </div>
        <button type="submit" className="btn btn-primary1">Login</button>
      </form>
      <div className="mt-3">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
