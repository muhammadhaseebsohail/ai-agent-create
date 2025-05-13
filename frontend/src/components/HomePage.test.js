Here is the basic unit test setup for the HomePage component using Jest and React Testing Library:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      }),
    );
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test('renders loading state', async () => {
    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch error')),
    );
    render(<HomePage />);
    await screen.findByText('An error occurred');
  });

  test('renders homepage content', async () => {
    render(<HomePage />);
    expect(await screen.findByText('Welcome to our homepage!')).toBeInTheDocument();
    expect(screen.getByText('This is our cool homepage. Enjoy your stay!')).toBeInTheDocument();
  });
});
```

In this code, we have three tests:

1. `renders loading state`: This test checks if the loading state is rendered correctly. It checks if the text "Loading..." is present in the document.

2. `renders error state`: This test checks if the error state is rendered correctly. We mock a fetch error and check if the text "An error occurred" is present in the document.

3. `renders homepage content`: This test checks if the main content of the homepage is rendered correctly. It checks if the text "Welcome to our homepage!" and "This is our cool homepage. Enjoy your stay!" are present in the document.

The `beforeAll` and `afterAll` functions are used to set up and tear down the fetch mock. They run before and after all tests.