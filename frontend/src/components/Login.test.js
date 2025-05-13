The provided code seems correct. However, the test is not correctly asserting the functionality of the component. It lacks the mocking of the API call and the check for the redirect. This can be fixed by using the `jest.mock()` function to mock the `axios` module and `jest.spyOn()` to spy on the `history.push()` function.

Here's the corrected unit test:

```jsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Login from './Login';

jest.mock('axios');

test('handles login and redirects on success', async () => {
  const fakeApi = 'http://fakeapi.com';
  const history = createMemoryHistory();
  const pushSpy = jest.spyOn(history, 'push');

  axios.post.mockResolvedValueOnce({ data: {} });

  const { getByPlaceholderText, getByText } = render(
    <Router history={history}>
      <Login loginApiUrl={fakeApi} />
    </Router>
  );

  fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'testpass' } });
  
  fireEvent.click(getByText(/login/i));

  await waitFor(() => expect(axios.post).toHaveBeenCalledWith(fakeApi, { username: 'testuser', password: 'testpass' }));
  expect(pushSpy).toHaveBeenCalledWith('/homepage');
});
```

Here, we mock the `axios.post` call to resolve immediately. We also create a memory history and spy on the `push` method to assert that it has been called with the correct argument. We wrap our component in a `Router` with the memory history we created. This allows us to test the navigation within our component.