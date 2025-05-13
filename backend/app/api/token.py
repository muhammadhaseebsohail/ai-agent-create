To implement this task, we will need two API endpoints: one for user signup and another one for user login. Let's assume we are using OAuth2 for authentication. Also, since we are talking about redirection, we will need to handle it in the frontend part of the application, not in the backend. However, the backend will return the necessary data to let the frontend know whether to redirect or not.

Here is the necessary backend code:

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

# Define your secret key and algorithms here
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create a password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Initialize the FastAPI app
app = FastAPI()


class TokenData(BaseModel):
    username: Optional[str] = None

class UserInDB(BaseModel):
    username: str
    hashed_password: str

# Mock user in database
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "hashed_password": pwd_context.hash("secret"),
    }
}

def fake_hash_password(password: str):
    return pwd_context.hash(password)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/signup")
def signup(username: str, password: str):
    if username in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    hashed_password = fake_hash_password(password)
    fake_users_db[username] = {"username": username, "hashed_password": hashed_password}
    return {"detail": "User created"}

```

This code is a simplified version and it uses a mock database and user authentication. If the user authentication is successful, the "/token" endpoint will return an access token that can be used for subsequent requests. On the frontend side, when the access token is received, the user can be redirected to the home page.

The "/signup" endpoint will create a new user in our mock database. If the username already exists, an error will be raised. When the user is created successfully, a "User created" message is returned.

Unit tests and database models are not included in this example as they would need more detailed information about the specific application and its database. The error handling and logging are also simplified.