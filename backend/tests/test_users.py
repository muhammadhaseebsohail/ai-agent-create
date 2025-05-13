Here are comprehensive unit tests for the FastAPI endpoint:

```python
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from main import app, get_db, models
from main.schemas import UserCreate

engine = create_engine("sqlite:///./test.db")
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
models.Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert response.json() == {"id": 1, "username": "testuser", "hashed_password": "$2b$12$..."}

def test_create_user_existing_username():
    response = client.post("/users/", json={"username": "testuser", "password": "newpass"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already registered"}

def test_create_user_no_username():
    response = client.post("/users/", json={"password": "testpass"})
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "username"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }

def test_create_user_no_password():
    response = client.post("/users/", json={"username": "testuser2"})
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "password"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }

def test_login_valid():
    response = client.post("/login/", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert response.json() == {"id": 1, "username": "testuser"}

def test_login_invalid_username():
    response = client.post("/login/", json={"username": "invaliduser", "password": "testpass"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid username or password"}

def test_login_invalid_password():
    response = client.post("/login/", json={"username": "testuser", "password": "invalidpass"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid username or password"}
```

In these tests, we are testing both the success and error cases. We are also testing data validation by trying to create a user without a username or password. This should return a 422 Unprocessable Entity error with the appropriate error message. We also test for edge cases, such as trying to create a user with an existing username. This should return a 400 Bad Request error with the appropriate error message.