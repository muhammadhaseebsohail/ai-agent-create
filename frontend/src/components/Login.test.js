```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<Login onLogin={() => {}} />);
    
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });
  
  it('calls onLogin on form submission', () => {
    const onLoginMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(<Login onLogin={onLoginMock} />);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testPassword' } });
    fireEvent.click(getByText('Login'));

    expect(onLoginMock).toHaveBeenCalledWith('testUser', 'testPassword');
  });
  
  it('displays error when fields are empty', () => {
    const onLoginMock = jest.fn();

    const { getByText } = render(<Login onLogin={onLoginMock} />);
    fireEvent.click(getByText('Login'));

    expect(getByText('All fields are required')).toBeInTheDocument();
  });
});
```

In the first test, we're simply checking if the Login component renders without crashing and if the input fields are present in the document.

In the second test, we simulate user interaction by entering values into the username and password fields and clicking the 'Login' button. We then expect the `onLogin` function to have been called with the correct arguments.

In the third test, we simulate a user clicking the 'Login' button without entering any values into the username and password fields. Since the Login component validates the input and sets an error message when either field is empty, we expect to see the error message in the document.