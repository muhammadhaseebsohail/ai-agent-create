```python
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import Session, sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError
import logging

# Initialize logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# Database setup
Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    content = Column(String)

engine = create_engine('sqlite:///./test.db')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# Pydantic Models
class User(BaseModel):
    username: str = Field(...)
    content: Optional[str] = Field(None)

class UserInDB(User):
    id: int

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/user/{user_id}", response_model=UserInDB)
def read_user_content(user_id: int, db: Session = Depends(get_db)):
    """
    Fetch user specific content
    """
    user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

In the above code, we have defined an endpoint to fetch user specific content. We have used SQLAlchemy for ORM and SQLite as a database. We have defined Pydantic models for defining the data structure and validation. We have also implemented a dependency for database session management.

Unit test for this endpoint can be written as follows:

```python
from fastapi.testclient import TestClient

def test_read_user_content():
    client = TestClient(app)
    response = client.get("/user/1")
    assert response.status_code == 200
    assert "username" in response.json()
    assert "content" in response.json()
    assert "id" in response.json()
```

This test checks whether the API endpoint is returning a 200 status code and required fields in the response. You can further improve the test by adding more validation checks and more test cases for different scenarios such as user not found, etc.