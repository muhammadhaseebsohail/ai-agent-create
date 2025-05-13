Here is a set of unit tests that covers the success cases, error cases, data validation, and edge cases for the endpoints:

```python
from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine, engine
from sqlalchemy.orm import sessionmaker, Session
from . import models, services

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user():
    # Testing success case
    response = client.post("/users/", json={"email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert data["is_active"] == True

    # Testing error case - trying to create a user with an email that's already registered
    response = client.post("/users/", json={"email": "test@example.com", "password": "password2"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

    # Testing data validation - email field is required
    response = client.post("/users/", json={"password": "password"})
    assert response.status_code == 422

def test_login_user():
    # Testing success case
    response = client.post("/users/login", json={"email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"

    # Testing error case - incorrect password
    response = client.post("/users/login", json={"email": "test@example.com", "password": "wrongpassword"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect email or password"}

    # Testing edge case - email not registered
    response = client.post("/users/login", json={"email": "test2@example.com", "password": "password"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect email or password"}

    # Testing data validation - password field is required
    response = client.post("/users/login", json={"email": "test@example.com"})
    assert response.status_code == 422
```

In this test, we create a SQLite database for testing, and override the `get_db` dependency with a version that gets a database session from this test database. This allows us to use a separate database for testing, so we don't modify the real database while testing.

These tests cover the creation and login of a user, as well as error cases for trying to create a user with an already registered email, logging in with an incorrect password, and logging in with an email that isn't registered. They also test the Pydantic models' data validation by attempting to create and login a user without providing all the required fields.