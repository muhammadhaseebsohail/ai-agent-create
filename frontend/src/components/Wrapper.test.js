The component code and test setup you provided is correct. You are using Jest and React Testing Library to test the rendering of the HomePage component based on the `isLoggedIn` prop. Here is the same test setup:

```jsx
// HomePage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage component', () => {
  test('renders welcome message for logged in user', () => {
    const { getByText } = render(<HomePage isLoggedIn={true} />);
    expect(getByText('Welcome back, User!')).toBeInTheDocument();
  });

  test('renders login message for non logged in user', () => {
    const { getByText } = render(<HomePage isLoggedIn={false} />);
    expect(getByText('Please log in or sign up')).toBeInTheDocument();
  });
});
```

In this setup, we've added a `describe` block for better organization of the tests. This is useful when you have multiple test cases for a component. 

The `getByText` function from React Testing Library is used to query the rendered component, and we use Jest's `expect` function to check if the correct text is in the document. This setup tests the rendering of the component based on the `isLoggedIn` prop.