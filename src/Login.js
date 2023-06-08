import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
