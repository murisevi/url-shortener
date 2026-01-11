import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setShortCode('');

    try {
      const response = await axios.post('http://localhost:8000/Url/', {
        id: Math.floor(Math.random() * 10000),
        original: originalUrl,
        code: ''
      });
      setShortCode(response.data.code);
      console.log('Short URL code:', response.data.code);
    } catch (err) {
      setError('Error creating short URL: ' + (err.response?.data?.detail || err.message));
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>URL Shortener</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleShortenUrl()}
            className="url-input"
          />
          <button
            onClick={handleShortenUrl}
            disabled={loading}
            className="shorten-btn"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {shortCode && (
          <div className="result">
            <p className="result-label">Your short code:</p>
            <p className="result-code">{shortCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
