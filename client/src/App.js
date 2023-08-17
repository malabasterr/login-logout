import './App.css';
import React, { useState, useContext, createContext } from 'react';

// Create a context for user authentication logic
const AuthenticationContext = createContext();

// Object to store username and password combinations
const users = {
  user1: 'password1',
  user2: 'password2',
  user3: 'password3',
  user4: 'password4',
  user5: 'password5',
};

// --- Authentication Component ---

// Manages the state of the authentication
const AuthenticationComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  // Log in process
  const handleLogin = (givenUsername, givenPassword) => {
    const storedPassword = users[givenUsername];
    if (storedPassword && storedPassword === givenPassword) {
      setIsLoggedIn(true);
      setUsername(givenUsername);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  // Log out process
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setIsInvalid(false);
  };

  // Object to hold the values of the authentication
  const AuthenticationValues = {
    isLoggedIn,
    username,
    isInvalid,
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
  const { isLoggedIn, username, isInvalid, handleLogin, handleLogout } =
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

  // rendering of pages
  return (
    <div className='formComponent'>
      {isLoggedIn ? (
        // User is logged in (welcome page)
        <div className='welcomeContainer'>
          <p className='welcomeText'>Welcome, {username}! You have successfully logged in.</p>
          <p>Click here to sign out:</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : isInvalid ? (
        // User inputs invalid details (invalid username/password page)
        <div className='invalidDetailsContainer'>
          <p className='unsuccessfulText'>Log in unsuccessful- invalid username or password. Please try again</p>
          <p>Click here to return to the log in page:</p>
          <button onClick={handleLogout}>Back to log in</button>
        </div>
      ) : (
        // User is not logged in (homepage)
        <div className='homepageContainer'>
          <h1 className='title'>Log In Page</h1>
          <div className='inputContainer'>
            <label className='username'>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={givenUsername}
              onChange={handleUsernameChange}
            />
          </div>
          <div className='inputContainer'>
            <label className='password'>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={givenPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={handleLoginSubmit}>Login</button>
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
