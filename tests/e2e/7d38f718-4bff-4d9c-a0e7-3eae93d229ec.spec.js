Frontend Tests:

1. Unit Tests using Jest and React Testing Library:
    ```javascript
    import { render, fireEvent } from '@testing-library/react';
    import Login from './Login';

    // Test successful login
    test('successful login', () => {
        const { getByLabelText, getByText } = render(<Login />);

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'testUser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'testPass' } });

        fireEvent.click(getByText(/log in/i));

        expect(getByText(/logging in.../i)).toBeInTheDocument();
    });

    // Test unsuccessful login
    test('unsuccessful login', () => {
        const { getByLabelText, getByText } = render(<Login />);

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'wrongUser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongPass' } });

        fireEvent.click(getByText(/log in/i));

        expect(getByText(/login failed/i)).toBeInTheDocument();
    });
    ```

2. E2E Tests using Cypress:
    ```javascript
    // Test successful login
    it('Successful login redirects to the dashboard', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type('testUser');
        cy.get('input[name=password]').type('testPass');

        cy.get('button[type=submit]').click();

        // Check redirection
        cy.url().should('include', '/dashboard');
    });

    // Test unsuccessful login
    it('Unsuccessful login shows an error message', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type('wrongUser');
        cy.get('input[name=password]').type('wrongPass');

        cy.get('button[type=submit]').click();

        // Check error message
        cy.get('.error').should('contain', 'Login failed');
    });
    ```

Backend Tests:

3. API Integration Tests using Pytest:
    ```python
    import pytest
    import requests

    # Test successful login
    def test_successful_login():
        response = requests.post('http://localhost:8000/login', data = {'username': 'testUser', 'password': 'testPass'})
        
        assert response.status_code == 200
        assert 'access_token' in response.json()

    # Test unsuccessful login
    def test_unsuccessful_login():
        response = requests.post('http://localhost:8000/login', data = {'username': 'wrongUser', 'password': 'wrongPass'})
        
        assert response.status_code == 401
        assert 'detail' in response.json()
        assert response.json()['detail'] == 'Incorrect username or password'
    ```

4. Data Validation and Error Handling Test:
    ```python
    # Test invalid data input
    def test_invalid_data_input():
        response = requests.post('http://localhost:8000/login', data = {'username': 123, 'password': 'testPass'})
        
        assert response.status_code == 422
        assert 'detail' in response.json()
    ```