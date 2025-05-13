Frontend Tests:
Using Cypress or Playwright for end-to-end tests

1. Test Case: Check the redirection to homepage functionality when clicking on the logo from any page
    ```
    it('should redirect to homepage when logo is clicked', () => {
        cy.visit('/random-page');
        cy.get('[data-testid="logo"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    ```
2. Test Case: Check the redirection to homepage functionality when clicking on the "Home" link from the navigation menu
    ```
    it('should redirect to homepage when Home link is clicked', () => {
        cy.visit('/random-page');
        cy.get('[data-testid="home-link"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    ```
3. Test Case: Check the redirection to homepage functionality when user is not logged in and tries to access protected pages
    ```
    it('should redirect to homepage when user tries to access protected page while not logged in', () => {
        cy.visit('/protected-page');
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    ```

Backend Tests:
Using pytest for Python/FastAPI tests

1. Test Case: Test if the homepage returns 200 status code
    ```
    def test_homepage(test_app_with_db):
        response = test_app_with_db.get("/")
        assert response.status_code == 200
    ```
2. Test Case: Test if the homepage returns the correct content
    ```
    def test_homepage_content(test_app_with_db):
        response = test_app_with_db.get("/")
        assert response.json()["message"] == "Welcome to the homepage"
    ```   
3. Test Case: Test if the protected page redirects to homepage when user is not authenticated
    ```
    def test_protected_page_redirects_to_home(test_app_with_db):
        response = test_app_with_db.get("/protected-page")
        assert response.status_code == 302
        assert response.headers["Location"] == "/"
    ```   
4. Test Case: Test if the redirection to homepage works correctly when invalid URL is accessed
    ```
    def test_invalid_url_redirects_to_home(test_app_with_db):
        response = test_app_with_db.get("/non-existant-page")
        assert response.status_code == 302
        assert response.headers["Location"] == "/"
    ```