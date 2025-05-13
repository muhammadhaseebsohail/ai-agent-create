Sure, here's how you could write the tests using pytest and FastAPI TestClient:

```python
from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest

engine = create_engine('sqlite:///:memory:')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture
def client():
    return TestClient(app)

def test_login_success(client, db):
    UserService.create_user(db, UserCreate(username="user1", password="password1"))
    response = client.post("/login", auth=("user1", "password1"))
    assert response.status_code == 200
    assert response.json()["username"] == "user1"

def test_login_incorrect_password(client, db):
    UserService.create_user(db, UserCreate(username="user1", password="password1"))
    response = client.post("/login", auth=("user1", "wrongpassword"))
    assert response.status_code == 401

def test_login_incorrect_username(client, db):
    UserService.create_user(db, UserCreate(username="user1", password="password1"))
    response = client.post("/login", auth=("wronguser", "password1"))
    assert response.status_code == 401

def test_login_no_username(client):
    response = client.post("/login", auth=("", "password1"))
    assert response.status_code == 401

def test_login_no_password(client):
    response = client.post("/login", auth=("user1", ""))
    assert response.status_code == 401

def test_login_special_characters(client, db):
    UserService.create_user(db, UserCreate(username="user1#@", password="password1"))
    response = client.post("/login", auth=("user1#@", "password1"))
    assert response.status_code == 200
    assert response.json()["username"] == "user1#@"

```
In these tests, we are using pytest fixtures for setting up the client and the database session. We create a user before each test, and then we test different scenarios: correct login, incorrect password, incorrect username, no username, no password, and a username with special characters.