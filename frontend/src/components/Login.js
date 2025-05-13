Here's how you could create a login component in React:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// Login component
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onLogin({ email, password });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Prop types
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
```

Here's the CSS for the component:

```css
/* Login.css */

.Login {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.Login h1 {
  text-align: center;
}

.Login .error {
  color: red;
}

.Login form {
  display: flex;
  flex-direction: column;
}

.Login form label {
  margin-bottom: 10px;
}

.Login form input {
  padding: 10px;
  margin-bottom: 20px;
}

.Login form button {
  padding: 10px;
}
```

For testing, you can use a library like Jest and React Testing Library:

```jsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

test('submits form and calls onLogin with email and password', async () => {
  const onLogin = jest.fn();
  const { getByLabelText, getByText } = render(<Login onLogin={onLogin} />);

  fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });

  fireEvent.click(getByText(/login/i));

  await waitFor(() => expect(onLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' }));
});
```

This component and test setup follow best practices by including error handling, loading states, and keeping components reusable and maintainable. They also use functional components and hooks.