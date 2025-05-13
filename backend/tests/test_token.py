The following are the unit tests for the provided FastAPI endpoints using pytest and FastAPI TestClient:

```python
from fastapi.testclient import TestClient
from main import app, fake_users_db, fake_hash_password

client = TestClient(app)

def test_get_access_token():
    response = client.post("/token", data={"username": "johndoe", "password": "secret"})
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_get_access_token_wrong_password():
    response = client.post("/token", data={"username": "johndoe", "password": "wrongpassword"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}

def test_get_access_token_non_existent_user():
    response = client.post("/token", data={"username": "nonexistent", "password": "password"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}

def test_signup_new_user():
    response = client.post("/signup", json={"username": "newuser", "password": "newpassword"})
    assert response.status_code == 200
    assert response.json() == {"detail": "User created"}
    assert "newuser" in fake_users_db
    assert fake_users_db["newuser"]["hashed_password"] != "newpassword"   # password should be hashed

def test_signup_existing_user():
    response = client.post("/signup", json={"username": "johndoe", "password": "password"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already exists"}

def test_signup_without_password():
    response = client.post("/signup", json={"username": "user_without_password"})
    assert response.status_code == 422    # Unprocessable Entity
    assert "detail" in response.json()

def test_signup_without_username():
    response = client.post("/signup", json={"password": "password_without_username"})
    assert response.status_code == 422    # Unprocessable Entity
    assert "detail" in response.json()
```

In these tests, we are testing for successful user login, unsuccessful login with wrong password and non-existing user. We are also testing for successful user sign up, sign up with existing username, and sign up with missing username or password. 

Please, note that for a real-world application, more comprehensive tests would be required, considering various edge cases and possible failures. As this is a simplified version, we are only testing the main functionality and some basic error cases.