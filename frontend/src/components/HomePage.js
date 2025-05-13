Component: HomePage

Here is the code for the HomePage component.

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';

/**
 * HomePage component
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
function HomePage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Fetch data or perform other setup here
    // On success:
    setIsLoading(false);
    // On failure:
    // setError('An error occurred');
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="homepage">
      <h1>Welcome to our homepage!</h1>
      <p>This is our cool homepage. Enjoy your stay!</p>
    </div>
  );
}

HomePage.propTypes = {
  // define your prop types here if any
};

export default HomePage;
```

CSS/styling:

```css
/* HomePage.css */

.homepage {
  padding: 20px;
}

.homepage h1 {
  font-size: 2em;
  color: #333;
}

.homepage p {
  color: #666;
}
```

PropTypes:

We currently have no props, so no PropTypes are needed.

Basic unit test setup:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders homepage', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Welcome to our homepage!/i);
  expect(linkElement).toBeInTheDocument();
});
```