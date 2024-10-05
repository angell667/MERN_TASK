// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="image-side">
        <img src="https://t3.ftcdn.net/jpg/07/78/59/60/360_F_778596041_6W6teVhFlGhPJjefYo1gv1krfsneMHTe.jpg" alt="Login" />
      </div>
      <div className="form-side">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/010/998/284/small/3d-password-input-illustration-design-free-png.png" alt="" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
