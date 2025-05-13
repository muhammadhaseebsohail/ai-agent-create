Sure, here is a basic unit test setup for the HomePage component using Jest and React Testing Library:

```jsx
// Import required dependencies
import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import HomePage from './HomePage';

// Mocking the setTimeout function
jest.useFakeTimers();

describe('HomePage', () => {
  it('should render without crashing', () => {
    render(<HomePage requirements={[]} />);
  });

  it('should display loading message initially', () => {
    render(<HomePage requirements={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should remove loading message after 2 seconds', async () => {
    render(<HomePage requirements={[]} />);
    jest.advanceTimersByTime(2000);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  it('should render requirements', () => {
    const { getAllByText } = render(<HomePage requirements={['HTML', 'CSS', 'JavaScript']} />);
    jest.advanceTimersByTime(2000);
    const items = getAllByText(/HTML|CSS|JavaScript/i);
    expect(items).toHaveLength(3);
  });
});
```

This test suite checks if the component renders without crashing, if the loading message displays initially and is removed after 2 seconds, and if the requirements are rendered correctly. 

The `jest.useFakeTimers()` function is used to mock the `setTimeout` function and the `jest.advanceTimersByTime(2000)` function is used to advance the timers by 2 seconds. 

The `waitForElementToBeRemoved` function from React Testing Library is used to wait until the loading message is removed from the document. 

The `getAllByText` function is used to get all elements that match the given text.