import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- PERUBAHAN DI SINI ---
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Username atau password salah');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username: </label><br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '95%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '95%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </div>
  );
}

export default Login;
