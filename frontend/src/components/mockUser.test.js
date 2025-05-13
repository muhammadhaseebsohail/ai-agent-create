1. Component Code:

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';

// This is a mock user data for demonstration purposes.
const mockUser = {
    name: 'John Doe',
    id: '123',
};

// This is a mock user-specific content.
const mockContent = 'Welcome, John Doe!';

const HomePage = (props) => {
    const [user, setUser] = useState({});
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setUser(mockUser);
            setContent(mockContent);
            setIsLoading(false);
        } catch (e) {
            setError(e);
        }
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-page">
            <h1>Hello, {user.name}!</h1>
            <p>{content}</p>
        </div>
    );
};

HomePage.propTypes = {
    user: PropTypes.object,
    content: PropTypes.string,
};

export default HomePage;
```

2. CSS/Styling (HomePage.css):

```css
.home-page {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.home-page h1 {
    font-size: 24px;
    color: #333;
}

.home-page p {
    font-size: 18px;
    color: #666;
}
```

3. PropTypes:

```jsx
HomePage.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    content: PropTypes.string,
};
```

4. Basic unit test setup:

```jsx
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders home page', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/hello, John Doe!/i);
    expect(linkElement).toBeInTheDocument();
});
```

Remember to replace the mock data with actual data. The error handling and loading states are handled in the useEffect hook. Stateless functional components and hooks have been used as per the guidelines.
            
            Use Jest and React Testing Library.