import React, { useState } from 'react';

const API_URL = 'http://localhost:13000';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = new URL(`${API_URL}/painting`);
      url.searchParams.append('username', username);
      url.searchParams.append('password', password);

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Sign in failed. Please check your credentials.');
      }

      // THE FIX: Get the response as a text string first.
      const responseText = await response.text();
      // Then, parse that string into a JSON object.
      const data = JSON.parse(responseText);
      onLoginSuccess(data);

    } catch (err) {
      // This will catch both network errors and JSON parsing errors.
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;