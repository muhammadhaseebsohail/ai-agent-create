Sure, let's implement server-side logic for user authentication. We'll use FastAPI, Pydantic, and a fictitious database layer.

Firstly, we need a User model to interact with our database:

```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
```

Next, we will need Pydantic models for handling our request/response data:

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int
    hashed_password: str

    class Config:
        orm_mode = True
```

Next, we will create a service layer that handles the business logic:

```python
from fastapi import HTTPException, Depends, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def get_user_by_username(self, db: Session, username: str):
        return db.query(models.User).filter(models.User.username == username).first()

    def create_user(self, db: Session, user: schemas.UserCreate):
        hashed_password = pwd_context.hash(user.password)
        db_user = models.User(username=user.username, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def authenticate_user(self, db: Session, username: str, password: str):
        user = self.get_user_by_username(db, username)
        if not user:
            return False
        if not pwd_context.verify(password, user.hashed_password):
            return False
        return user
```

Finally, we will create our API endpoints:

```python
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas, services

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.UserInDB)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.
    """
    db_user = services.UserService().get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return services.UserService().create_user(db=db, user=user)

@app.post("/login/")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Authenticate user.
    """
    db_user = services.UserService().authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"id": db_user.id, "username": db_user.username}
``` 

Now, we'll write some unit tests for our endpoints:

```python
from fastapi.testclient import TestClient

def test_create_user():
    with TestClient(app) as client:
        response = client.post("/users/", json={"username": "testuser", "password": "testpass"})
        assert response.status_code == 200
        assert response.json() == {"id": 1, "username": "testuser"}

def test_login():
    with TestClient(app) as client:
        response = client.post("/login/", json={"username": "testuser", "password": "testpass"})
        assert response.status_code == 200
        assert response.json() == {"id": 1, "username": "testuser"}
```

This is a very basic implementation and there are many things you could add. For example, you could include a token-based authentication system, where users receive a token when they log in and then use that token to authenticate future requests. Also, please note that the database session handling is simplified for the sake of this example. In a production application, you would want to use a proper session management system.