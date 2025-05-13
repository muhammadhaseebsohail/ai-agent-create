Here is how you might implement the unit tests for the `/login` endpoint:

```python
from fastapi.testclient import TestClient
from fastapi import status
from main import app

client = TestClient(app)

def test_login_success():
    """Test successful user login."""
    response = client.post("/login", auth=("testuser", "testpassword"))
    assert response.status_code == status.HTTP_303_SEE_OTHER
    assert response.headers["location"] == "/homepage"

def test_login_invalid_username():
    """Test login with invalid username."""
    response = client.post("/login", auth=("wronguser", "testpassword"))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Incorrect username or password"}

def test_login_invalid_password():
    """Test login with invalid password."""
    response = client.post("/login", auth=("testuser", "wrongpassword"))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Incorrect username or password"}

def test_login_no_auth():
    """Test login with no authentication provided."""
    response = client.post("/login")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_login_empty_username_password():
    """Test login with empty username and password."""
    response = client.post("/login", auth=("", ""))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Incorrect username or password"}
```

These tests cover:
- Success case where the user provides valid username and password
- Error cases where the username or password is incorrect
- Error case where no authentication details are provided
- Edge case where both the username and password are empty strings

In these tests, we're using FastAPI's `TestClient` to send HTTP requests to our app. We assert on the HTTP status code and the response body to make sure our app is behaving as expected.