Below is the code for a simple Login component using React functional components and hooks. It also uses PropTypes for type checking and includes a basic input validation.

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

/**
* Login component
* @param {function} props.onLogin - Function to be called on successful login
*/

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const validateInput = () => {
    if (!username || !password) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      onLogin(username, password);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
```

For the CSS part we can use CSS modules. Here is a simple CSS for the Login component.

```css
/* Login.css */
.login {
  width: 300px;
  margin: 0 auto;
}

.login input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}

.login .error {
  color: red;
  margin-bottom: 10px;
}

.login button {
  padding: 10px;
  width: 100%;
}
```

For the unit test, you can use Jest and Enzyme. Below is a simple test setup for the Login component.

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    shallow(<Login onLogin={() => {}} />);
  });

  it('calls onLogin on form submission', () => {
    const onLoginMock = jest.fn();

    const wrapper = shallow(<Login onLogin={onLoginMock} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(onLoginMock).toHaveBeenCalled();
  });
});
```