Here's an example of how you can implement a Login component that redirects to the homepage after a successful login using React.

1. The complete component code:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

/**
 * Login component, handles user login and redirects to homepage on successful login.
 *
 * @param {string} loginApiUrl - API url for login request.
 * @returns {React.Component}
 */
function Login({ loginApiUrl }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(loginApiUrl, { username, password });
      history.push('/homepage');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  loginApiUrl: PropTypes.string.isRequired,
};

export default Login;
```

2. CSS/Styling:

```css
/* CSS in JS styling */

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

3. PropTypes:

```jsx
Login.propTypes = {
  loginApiUrl: PropTypes.string.isRequired,
};
```

4. Basic unit test setup:

```jsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

test('handles login and redirects on success', async () => {
  const fakeApi = 'http://fakeapi.com';
  const { getByPlaceholderText, getByText } = render(<Login loginApiUrl={fakeApi} />);

  fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'testpass' } });
  
  fireEvent.click(getByText(/login/i));

  await waitFor(() => expect(getByText(/logging in.../i)).toBeInTheDocument());
});
```