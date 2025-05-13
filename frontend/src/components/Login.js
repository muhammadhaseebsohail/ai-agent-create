Here is a basic setup for a Login component in React:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => username.length > 0 && password.length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(username, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!validateForm() || isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
```

Here is the accompanying CSS:

```css
/* Login.css */
.login-wrapper {
  width: 300px;
  margin: 0 auto;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-bottom: 10px;
}
```

For the PropTypes, we've defined that onLogin is a required function.

Finally, here's a basic test setup for this component:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  const onLogin = jest.fn();
  const { getByLabelText, getByText } = render(<Login onLogin={onLogin} />);

  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  
  fireEvent.click(getByText(/login/i));
  
  expect(onLogin).toHaveBeenCalledWith('testuser', 'testpassword');
});
```