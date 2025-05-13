Here are the unit tests that cover the suggested cases:

```python
import pytest
from fastapi.testclient import TestClient
from main import app, authenticate_user, create_access_token
from models import User, UserInDB

client = TestClient(app)

def test_login_success():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"username": "test", "password": "test"},
        )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()

def test_login_error_wrong_password():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"username": "test", "password": "wrong_password"},
        )
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}

def test_login_error_no_username():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"password": "test"},
        )
    assert response.status_code == 422
    assert "username" in response.json()["detail"][0]["loc"]

def test_login_error_no_password():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"username": "test"},
        )
    assert response.status_code == 422
    assert "password" in response.json()["detail"][0]["loc"]

def test_login_error_empty_string():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"username": "", "password": ""},
        )
    assert response.status_code == 422

def test_login_edge_case_long_username():
    with TestClient(app) as client:
        response = client.post(
            "/token",
            data={"username": "a"*1025, "password": "test"},
        )
    assert response.status_code == 422

def test_authenticate_user():
    fake_db = {"test": {"username": "test", "hashed_password": "$2b$12$aM2.y7Dm1yMHCqghW6m9H.Q7E0F3Kq9rR3R2QWv.7IJAu1kqWzL3W"}}
    user = authenticate_user(fake_db, "test", "test")
    assert isinstance(user, UserInDB)
    assert user.username == "test"

def test_create_access_token():
    to_encode = {"sub": "test"}
    token = create_access_token(to_encode)
    assert isinstance(token, str)
    assert "." in token
```

These tests should cover a variety of cases, including successful logins, invalid login attempts (wrong password, missing username or password), data validation (empty strings, long usernames), and edge cases. 

Please note that these tests assume that all usernames and passwords are lower case and that the hashed password for "test" is "$2b$12$aM2.y7Dm1yMHCqghW6m9H.Q7E0F3Kq9rR3R2QWv.7IJAu1kqWzL3W".
