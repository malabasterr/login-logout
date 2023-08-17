import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {

    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // accessing current value entered by the user
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // accessing current value entered by the user
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleLogin}>Login</button>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;
