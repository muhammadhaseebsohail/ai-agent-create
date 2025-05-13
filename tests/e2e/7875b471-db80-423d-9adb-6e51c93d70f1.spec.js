Frontend Test (using Cypress):

```javascript
describe('Login and Homepage Display', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');
  });

  it('Test case for successful login', () => {
    cy.get('#username').type('testUser');
    cy.get('#password').type('testPassword');
    cy.get('#loginButton').click();

    // Assertion: After successful login, URL should be homepage
    cy.url().should('include', '/home');
  });

  it('Test case for homepage display after login', () => {
    cy.get('#username').type('testUser');
    cy.get('#password').type('testPassword');
    cy.get('#loginButton').click();

    // Assertion: After login, the homepage should contain certain elements
    cy.get('#homeBanner').should('be.visible');
    cy.get('#welcomeMessage').should('be.visible');
    cy.get('#logoutButton').should('be.visible');

    // Edge case: The login button should not be visible on the homepage
    cy.get('#loginButton').should('not.exist');
  });
});
```

Backend Test (using pytest and FastAPI's TestClient):

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/login", data={"username": "testUser", "password": "testPassword"})
    assert response.status_code == 200
    assert response.json() == {"message": "Login successful"}

def test_homepage_display_after_login():
    response = client.post("/login", data={"username": "testUser", "password": "testPassword"})
    assert response.status_code == 200

    response = client.get("/home")
    assert response.status_code == 200
    assert "homeBanner" in response.text
    assert "welcomeMessage" in response.text
    assert "logoutButton" in response.text

    # Edge case: The login button should not be present in the homepage response
    assert "loginButton" not in response.text
```

Note: This is a simplified example. In a real-world scenario, you would likely need to handle sessions or JWTs to ensure the user remains logged in between requests.