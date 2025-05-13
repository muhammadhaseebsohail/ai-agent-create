Sure, here's a simple implementation of a Login page component in React:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPage.css';

/**
 * Login Page Component
 * @param {Object} props - component props
 * @param {Function} props.onLogin - callback function to handle login
 */
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onLogin({ username, password });
    } catch(e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
```

Here's the accompanying CSS:

```css
/* LoginPage.css */
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.login-page .error {
  color: red;
}

.login-page form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.login-page form label {
  margin-bottom: 10px;
}

.login-page form button {
  margin-top: 20px;
}
```

And here's a basic unit test setup for the component:

```jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    render(<LoginPage onLogin={jest.fn()} />);
  });

  it('handles form submission', async () => {
    const mockOnLogin = jest.fn();
    const { getByLabelText, getByRole } = render(<LoginPage onLogin={mockOnLogin} />);

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'test' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'test' } });

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(mockOnLogin).toHaveBeenCalledTimes(1));
  });
});
```

This is a basic login page with username and password fields. The `onLogin` prop is a function that gets called when the form is submitted. The component manages its own loading and error states. The CSS is simple and only for demonstration.