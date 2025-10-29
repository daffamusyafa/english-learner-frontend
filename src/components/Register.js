import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// --- PERUBAHAN DI SINI ---
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post(`${API_URL}/register`, { username, password });
      setMessage('Registrasi berhasil! Anda akan diarahkan ke halaman login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Username sudah digunakan atau input salah');
      setMessage('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username: </label><br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '95%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '95%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>Register</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
