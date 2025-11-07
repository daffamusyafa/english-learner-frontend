import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

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
    /* === TAMBAHKAN PEMBUNGKUS INI === */
    <div className="auth-container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: "100%"}}>Register</button>
        </form>
        {message && <p className="message-success">{message}</p>}
        {error && <p className="message-error">{error}</p>}
        <p style={{marginTop: '15px'}}>Sudah punya akun? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div> /* === DAN PENUTUP INI === */
  );
}

export default Register;
