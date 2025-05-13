To implement this functionality, I will create two routes: one for registration and one for login. I will use Pydantic models for data validation, FastAPI for the API framework, and SQLAlchemy for database operations. 

First, let's define the database models:

```python
from sqlalchemy import Boolean, Column, Integer, String

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
```

Next, we need to create the Pydantic models for the request and response:

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
```

Now, let's create service layer code for handling database operations:

```python
from sqlalchemy.orm import Session

from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

Now, let's define the FastAPI routes:

```python
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from . import models, schemas, services
from .database import SessionLocal

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.
    """
    db_user = services.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return services.create_user(db=db, user=user)

@app.post("/users/login", response_model=schemas.User)
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    User login.
    """
    db_user = services.get_user_by_email(db, email=user.email)
    if db_user is None or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return db_user
```

For the test, we could do something like:

```python
def test_create_user(client):
    response = client.post("/users/", json={"email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert data["is_active"] == True

def test_login_user(client):
    response = client.post("/users/login", json={"email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
```

This code does not include the actual implementation of `get_password_hash` and `verify_password`, which would handle the actual hashing and checking of passwords. These are important security features that should be implemented in a real application.

Furthermore, the login endpoint doesn't actually generate a token or anything similar for maintaining a user session. In a real application, you would likely want to return a token that could be used for authenticating future requests after a successful login.