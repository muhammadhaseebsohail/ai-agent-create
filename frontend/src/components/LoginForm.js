First, let's install some necessary dependencies:

1. `prop-types` for type checking
2. `axios` for HTTP requests
3. `react-router-dom` for routing

```bash
npm install prop-types axios react-router-dom
```

Here is the complete component code:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

/**
 * A login form component
 * @param {object} props - The props of the component
 * @param {string} props.apiURL - The URL of the login API
 */
const LoginForm = ({ apiURL }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(apiURL, {
        username,
        password,
      });

      setIsLoading(false);
      history.push('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  apiURL: PropTypes.string.isRequired,
};

export default LoginForm;
```

Here is the CSS for the component:

```css
/* Login.css */

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form .error {
  color: red;
}

.login-form label {
  display: block;
  margin-bottom: 10px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.login-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
```

Here is the PropTypes for the component:

```jsx
LoginForm.propTypes = {
  apiURL: PropTypes.string.isRequired,
};
```

Here is a basic unit test setup:

```jsx
// LoginForm.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders the login form', () => {
  const { getByLabelText, getByRole } = render(<LoginForm apiURL="http://example.com" />);

  const usernameInput = getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  expect(usernameInput.value).toBe('testuser');

  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  expect(passwordInput.value).toBe('testpass');

  const submitButton = getByRole('button');
  expect(submitButton).toBeInTheDocument();
});
```