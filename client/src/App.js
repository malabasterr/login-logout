import './App.css';
import React, { useState, useContext, createContext } from 'react';

// Create a context for user authentication logic
const AuthenticationContext = createContext();

// Object to store username and password combinations
const users = {
  user1: 'password1',
  user2: 'password2',
};

// --- Authentication Component ---

// Manages the state of the authentication
const AuthenticationComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // Log in process
  const handleLogin = (givenUsername, givenPassword) => {
    const storedPassword = users[givenUsername];
    if (storedPassword && storedPassword === givenPassword) {
      setIsLoggedIn(true);
      setUsername(givenUsername);
      setInvalidMessage('');
    } else {
      setInvalidMessage('Invalid username or password'); // Need to change this to a different page instead -------------------------
    }
  };

  // Log out process
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  // Object to hold the values of the authentication
  const AuthenticationValues = {
    isLoggedIn,
    username,
    invalidMessage,
    handleLogin,
    handleLogout,
  };

  // allows child components to have access to the authentication context
  return (
    <AuthenticationContext.Provider value={AuthenticationValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};

// --- Form Component ---

const FormComponent = () => {

  // Accesses the authentication context
  const { isLoggedIn, username, invalidMessage, handleLogin, handleLogout } =
    useContext(AuthenticationContext);

  // State to manage input boxes
  const [givenUsername, setGivenUsername] = useState('');
  const [givenPassword, setGivenPassword] = useState('');

  // Accesses current input values

  const handleUsernameChange = (event) => {
    setGivenUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setGivenPassword(event.target.value);
  };

  // Log in form submission
  const handleLoginSubmit = () => {
    handleLogin(givenUsername, givenPassword);
  };

  return (
    <div>
      {isLoggedIn ? (
        // 'isLoggedIn' is true
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // 'isLoggedIn' is false
        <div>
          <input
            type="text"
            placeholder="Username"
            value={givenUsername}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={givenPassword}
            onChange={handlePasswordChange}
          />
          <button onClick={handleLoginSubmit}>Login</button>
          <p>{invalidMessage}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthenticationComponent>
      <FormComponent />
    </AuthenticationComponent>
  );
};

export default App;
