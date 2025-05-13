Sure, here is a simple Login component built with React:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

/**
 * Login Component
 * @param {object} props - component props
 * @param {function} props.onLogin - Callback function to handle login
 */
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      onLogin({ username, password });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
```

Here is the CSS for the component:

```css
/* Login.css */
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.login-container form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.login-container form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
```

As the component uses PropTypes, here are the PropTypes for the component:

```jsx
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
```

Here is an example of a basic unit test setup for this component using Jest and React Testing Library:

```jsx
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('calls onLogin with the username and password when the submit button is clicked', () => {
  const handleLogin = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Login onLogin={handleLogin} />);

  fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'testpass' } });

  fireEvent.click(getByText(/login/i));

  expect(handleLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
});
```