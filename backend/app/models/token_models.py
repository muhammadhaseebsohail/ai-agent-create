Based on the provided code, we can create the following Pydantic models:

```python
from pydantic import BaseModel
from typing import Optional

class TokenData(BaseModel):
    username: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
```

The `TokenData` model will be used when handling the authentication token to store the username. The `Token` model will be used as the response model for the `/token` endpoint, which returns the access token and the token_type.

We also need to add the `authenticate_user` and `create_access_token` methods to the service layer:

```python
from jose import JWTError, jwt
from datetime import datetime, timedelta
from . import models, schemas

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
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
```

The `authenticate_user` function is used to validate the username and password, and the `create_access_token` function is used to create a JWT token with the username and expiration time. The token is then signed with a secret key.