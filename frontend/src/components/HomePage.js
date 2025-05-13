Sure, here is the basic implementation of a Homepage component in React following best practices.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';

/**
* HomePage component representing the homepage of the application
* @param {object} props - Properties passed to the component
* @returns {HTMLElement} - React functional component
*/
const HomePage = ({ skills }) => {
  return (
    <div className="homepage">
      <h1>Welcome to our Homepage</h1>
      <h2>Requirements</h2>
      <ul>
        {
          skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))
        }
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HomePage;
```

HomePage.css:

```css
.homepage {
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
}

.homepage h1, .homepage h2 {
  color: #333;
}

.homepage ul {
  list-style-type: none;
  padding: 0;
}
```

The propTypes have been defined to enforce the type of data that the component should receive.

Next, let's write a simple unit test for this component using Jest and Enzyme:

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    const skills = ["User interface design skills", "HTML", "CSS", "JavaScript"];
    shallow(<HomePage skills={skills} />);
  });

  it('displays the correct number of skills', () => {
    const skills = ["User interface design skills", "HTML", "CSS", "JavaScript"];
    const wrapper = shallow(<HomePage skills={skills} />);
    expect(wrapper.find('li')).toHaveLength(skills.length);
  });
});
```

In the unit tests above, we're first checking that the component renders without crashing. Next, we're checking that the correct number of skill elements (li tags) are rendered based on the length of the skills array.