import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getAuthApi = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

function Dashboard() {
  const [sentence, setSentence] = useState('');
  const [randomSentence, setRandomSentence] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddSentence = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const api = getAuthApi();
      await api.post('/api/sentences', { text: sentence });
      setMessage('Kalimat berhasil ditambahkan!');
      setSentence('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Gagal menambahkan kalimat.');
    }
  };

  const handleGetRandom = async () => {
    setMessage('');
    setError('');
    setRandomSentence('');
    try {
      const api = getAuthApi();
      const response = await api.get('/api/sentences/random');
      setRandomSentence(response.data.text);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Anda belum menambahkan kalimat apapun.');
      } else {
        setError('Gagal mengambil kalimat acak.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn btn-danger btn-float-right">Logout</button>
      <h2>Dashboard</h2>
      <hr />
      
      <div className="card">
        <h3>Tambahkan Kalimat Baru</h3>
        <form onSubmit={handleAddSentence} className="add-sentence-form">
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Tulis kalimat baru di sini..."
            required
            className="form-input"
          />
          <button type="submit" className="btn btn-primary">Tambah</button>
        </form>
        {message && <p className="message-success">{message}</p>}
      </div>

      <div className="card">
        <h3>Kalimat Acak</h3>
        <button onClick={handleGetRandom} className="btn btn-secondary">Acak Kalimat!</button>
        {randomSentence && (
          <div className="random-sentence-box">
            <h4>Kalimat terpilih:</h4>
            <p>"{randomSentence}"</p>
          </div>
        )}
      </div>

      {error && <p className="message-error">{error}</p>}
    </div>
  );
}

export default Dashboard;
