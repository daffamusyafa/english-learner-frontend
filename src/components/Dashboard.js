import React, { useState } from 'react';
import axios from 'axios';

// --- PERUBAHAN DI SINI ---
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
      <button onClick={handleLogout} style={{float: 'right', padding: '5px 10px'}}>Logout</button>
      <h2>Dashboard</h2>
      <hr style={{clear: 'both'}} />
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Tambahkan Kalimat Baru</h3>
        <form onSubmit={handleAddSentence}>
          <input type="text" value={sentence} onChange={(e) => setSentence(e.target.value)} placeholder="Tulis kalimat baru di sini..." required style={{ width: '70%', padding: '8px' }} />
          <button type="submit" style={{ padding: '9px 15px', marginLeft: '10px' }}>Tambah</button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>Kalimat Acak</h3>
        <button onClick={handleGetRandom} style={{ padding: '10px 15px' }}>Acak Kalimat!</button>
        {randomSentence && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
            <h4>Kalimat terpilih:</h4>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>"{randomSentence}"</p>
          </div>
        )}
      </div>
      {error && <p style={{ color: 'red', marginTop: '20px', fontWeight: 'bold' }}>{error}</p>}
    </div>
  );
}

export default Dashboard;
