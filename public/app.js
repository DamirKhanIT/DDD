import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]); // Store users data
  const [section, setSection] = useState('login'); // Control which section to show
  const [loginMessage, setLoginMessage] = useState(''); // Store login error message
  const [profileInfo, setProfileInfo] = useState(''); // Store profile info

  // Form state for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form state for register
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Fetch users when the component first renders
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const showSection = (selectedSection) => {
    setSection(selectedSection); 
  };

  const login = () => {
    if (loginEmail && loginPassword) {
      setProfileInfo(`Logged in as ${loginEmail}`);
      setLoginMessage(''); // Clear the login message
      showSection('profile');
    } else {
      setLoginMessage('Please fill in all fields.');
    }
  };

  const register = async () => {
    if (!registerName || !registerEmail || !registerPassword) {
      alert('Please fill in all fields.');
      return;
    }

    alert('Registration successful');
    // Add logic here to send data to the server
  };

  return (
    <div className="App">
      <h1>React App with Sections & Users</h1>

      {/* Navigation */}
      <nav>
        <button onClick={() => showSection('login')}>Login</button>
        <button onClick={() => showSection('register')}>Register</button>
        <button onClick={() => showSection('profile')}>Profile</button>
      </nav>

      {/* Display sections based on state */}
      {section === 'login' && (
        <div id="login-section">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)} // Use state for controlled input
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)} // Use state for controlled input
          />
          <button onClick={login}>Log In</button>
          <p style={{ color: 'red' }}>{loginMessage}</p> {/* Show login message */}
        </div>
      )}

      {section === 'register' && (
        <div id="register-section">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)} // Use state for controlled input
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)} // Use state for controlled input
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)} // Use state for controlled input
          />
          <button onClick={register}>Register</button>
        </div>
      )}

      {section === 'profile' && (
        <div id="profile-section">
          <h2>Profile</h2>
          <p id="profile-info">{profileInfo}</p> {/* Show profile info */}
        </div>
      )}

      {/* Users list */}
      <h2>Пайдаланушылар тізімі</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
