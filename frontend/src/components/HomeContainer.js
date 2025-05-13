Here's a basic structure for a Home page interface in React. In this case, I'm using the CSS-in-JS approach with styled-components for styling, and PropTypes for type checking. The layout is quite simple, but depending on your requirements, you could add more components and divide your page into more sections.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Define your styled components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  color: #666;
  text-align: center;
`;

// Define your component
const HomePage = ({ title, subtitle }) => (
  <HomeContainer>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </HomeContainer>
);

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

HomePage.defaultProps = {
  subtitle: '',
};

export default HomePage;
```

For the basic unit test setup, you can use Jest and React Testing Library. Here's a sample test case:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

test('renders home page with title and subtitle', () => {
  const { getByText } = render(<HomePage title="Welcome Home" subtitle="This is the Home page" />);
  
  expect(getByText('Welcome Home')).toBeInTheDocument();
  expect(getByText('This is the Home page')).toBeInTheDocument();
});
```

This test checks if the component renders and displays the passed props correctly.