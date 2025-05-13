Here is an example of the HomePage component:

```jsx
// HomePage.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Message = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const HomePage = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Message>
        {isLoggedIn ? 'Welcome back, User!' : 'Please log in or sign up'}
      </Message>
    </Wrapper>
  );
};

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomePage;
```

In this HomePage component, we use `styled-components` for CSS-in-JS styling. We have a `Wrapper` component to center the content and a `Message` component for the welcome message. The `isLoggedIn` prop is used to determine which message to display.

Here is a basic test setup using Jest and React Testing Library:

```jsx
// HomePage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

test('renders welcome message for logged in user', () => {
  const { getByText } = render(<HomePage isLoggedIn={true} />);
  expect(getByText('Welcome back, User!')).toBeInTheDocument();
});

test('renders login message for non logged in user', () => {
  const { getByText } = render(<HomePage isLoggedIn={false} />);
  expect(getByText('Please log in or sign up')).toBeInTheDocument();
});
```

In this test setup, we render the HomePage component with the `isLoggedIn` prop set to true and false, and check if the correct message is displayed.