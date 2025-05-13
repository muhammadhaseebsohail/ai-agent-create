First, we would need to create the database model for the User. We'll use SQLAlchemy to define the model.

```python
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base

Base: DeclarativeMeta = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
```

Next, we will create a Pydantic model for User input and output.

```python
from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
```

Then, we will create a service layer code to handle the CRUD operations of the User. We'll use passlib for password hashing and its context, cctx, to verify passwords.

```python
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def get_user(db: Session, user_id: int):
        return db.query(User).filter(User.id == user_id).first()

    def get_user_by_username(db: Session, username: string):
        return db.query(User).filter(User.username == username).first()

    def create_user(db: Session, user: UserCreate):
        hashed_password = pwd_context.hash(user.password)
        db_user = User(username=user.username, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
```

Next, we create the FastAPI application and implement the endpoints. We'll use HTTPBasic for authentication.

```python
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session

app = FastAPI()
security = HTTPBasic()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login", response_model=User)
def login(credentials: HTTPBasicCredentials = Depends(security), db: Session = Depends(get_db)):
    """
    Login user
    """
    user = UserService.get_user_by_username(db, credentials.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username",
            headers={"WWW-Authenticate": "Basic"},
        )
    if not UserService.verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user
```

Finally, we need to create a unit test for our login endpoint. We'll use pytest and requests for this.

```python
import pytest
import requests

def test_login():
    response = requests.post("http://localhost:8000/login", auth=("user1", "password1"))
    assert response.status_code == 200
    assert response.json()["username"] == "user1"

    response = requests.post("http://localhost:8000/login", auth=("user1", "wrongpassword"))
    assert response.status_code == 401

    response = requests.post("http://localhost:8000/login", auth=("wronguser", "password1"))
    assert response.status_code == 401
```