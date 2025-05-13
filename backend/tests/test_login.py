For comprehensive unit testing, we would want to test not only the successful login case and the incorrect password case, but also scenarios like a non-existent user, missing user credentials, and edge cases like excessively long usernames or passwords. Here are the tests:

```python
from fastapi.testclient import TestClient
import pytest

client = TestClient(app)

def test_login_success():
    response = client.post("/login", data={"username": "johndoe", "password": "secret"})
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_fail_wrong_password():
    response = client.post("/login", data={"username": "johndoe", "password": "wrongpassword"})
    assert response.status_code == 401

def test_login_fail_nonexistent_user():
    response = client.post("/login", data={"username": "nonexistentuser", "password": "secret"})
    assert response.status_code == 401

def test_login_fail_missing_username():
    response = client.post("/login", data={"password": "secret"})
    assert response.status_code == 422

def test_login_fail_missing_password():
    response = client.post("/login", data={"username": "johndoe"})
    assert response.status_code == 422

def test_login_fail_long_username():
    response = client.post("/login", data={"username": "a"*300, "password": "secret"})
    assert response.status_code == 422

def test_login_fail_long_password():
    response = client.post("/login", data={"username": "johndoe", "password": "a"*300})
    assert response.status_code == 422
```

The pytest framework is used to run these test cases. FastAPI's TestClient is used to make requests to the FastAPI application. The test cases cover a variety of scenarios and edge cases to ensure the login functionality works as expected in all situations.

These tests follow the Arrange, Act, Assert (AAA) pattern. The Arrange step sets up the test - setting the variables, and arranging the conditions for the test. The Act step invokes the method or function with the arranged parameters. The Assert step verifies that the outcome of the Act step is as expected.