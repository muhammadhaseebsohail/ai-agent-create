Sure, here is how to rewrite the tests using Jest and React Testing Library:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    const skills = ["User interface design skills", "HTML", "CSS", "JavaScript"];
    render(<HomePage skills={skills} />);
    expect(screen.getByText('Welcome to our Homepage')).toBeInTheDocument();
  });

  it('displays the correct number of skills', () => {
    const skills = ["User interface design skills", "HTML", "CSS", "JavaScript"];
    render(<HomePage skills={skills} />);
    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
```

In these tests, we first render the component with a list of skills. In the first test, we check that the title "Welcome to our Homepage" is present in the document, indicating that the component has rendered successfully.

In the second test, we loop through the skills array and for each skill, we check that it is present in the document. This ensures that the component is correctly rendering each skill in the list.