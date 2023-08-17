import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

const MainComponent = () => {
    const { isLoggedIn, username, errorMessage, handleLogin, handleLogout } =
      useContext(AuthContext);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setInputUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setInputPassword(event.target.value);
    };
  
    const handleLoginSubmit = () => {
      handleLogin(inputUsername, inputPassword);
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
              value={inputUsername}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
            <button onClick={handleLoginSubmit}>Login</button>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default MainComponent;