Below is a simple homepage component created with React.

```jsx
// Import required dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';

// Functional Component
const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading of data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Render
  return (
    <div className="homepage">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to our Homepage!</h1>
          <p>We have the following requirement:</p>
          <ul>
            {props.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// PropTypes
HomePage.propTypes = {
  requirements: PropTypes.array.isRequired,
};

export default HomePage;
```

For the CSS:

```css
/* Home.css */
.homepage {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.homepage h1 {
  color: #444;
}

.homepage p {
  color: #666;
}

.homepage ul {
  list-style: none;
  padding: 0;
}
```

For the PropTypes, it is already included in the component code.

Here is a basic unit test setup using Jest and Enzyme:

```jsx
// Import required dependencies
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render without crashing', () => {
    shallow(<HomePage requirements={[]} />);
  });

  it('should render requirements', () => {
    const wrapper = shallow(<HomePage requirements={['HTML', 'CSS', 'JavaScript']} />);
    expect(wrapper.find('li')).toHaveLength(3);
  });
});
```

Please note that this is a very basic homepage component. It's usually recommended to split your components into smaller, more maintainable parts. For instance, you could create a separate `Loading` component that handles the loading state. But for this simple example, it's fine to include everything in one component.