Here is how you can create a functional component for User Authentication in React.

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // for AJAX requests
import './Auth.css'; // import css

const Auth = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/authenticate', credentials);
      
      setLoading(false);
      onSuccess(response.data);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong.');
      onError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

Auth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
```

CSS:
```css
/* Auth.css */
.error {
  color: red;
}
```

Unit Test:
```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Auth from './Auth';

test('renders form and allows typing', () => {
  const { getByPlaceholderText } = render(<Auth onSuccess={() => {}} onError={() => {}} />);

  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'test@test.com' },
  });
  
  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'password' },
  });

  expect(getByPlaceholderText('Email').value).toBe('test@test.com');
  expect(getByPlaceholderText('Password').value).toBe('password');
});
```

Please replace '/api/authenticate' with your actual API endpoint. The axios post request expects your server to return a 200 status code along with any relevant user data if the authentication is successful. If the server returns any other status code, it will throw an error and call the onError callback. 

The 'onSuccess' and 'onError' callbacks are passed as props to handle the response or error at the parent component level.