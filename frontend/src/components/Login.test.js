The unit test setup for the Login component is already provided in the previous response. The test checks if the onLogin function is called with the correct email and password input values when the login button is clicked. Here it is again for clarity:

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

This test does the following:

- Mocks the onLogin function using Jest's `jest.fn()`.
- Renders the Login component with the mocked onLogin function as a prop.
- Simulates user input by firing a change event on the email and password input fields with the values 'test@example.com' and 'password' respectively.
- Simulates a click event on the login button.
- Waits for the onLogin function to be called with the correct email and password values.

This test can be run using the Jest command line tool with the command `npm test` or `yarn test`, depending on your package manager.