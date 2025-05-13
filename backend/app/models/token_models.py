The Pydantic models for the request and response have already been defined in the provided code. Here they are again for clarity:

```python
from pydantic import BaseModel
from typing import Optional

# Base model for user data
class UserBase(BaseModel):
    username: str
    password: str

# User model with additional fields
class User(UserBase):
    id: int
    is_active: bool

# User model for database with hashed password
class UserInDB(User):
    hashed_password: str

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str

# Token data model
class TokenData(BaseModel):
    username: Optional[str] = None
```

Here, `UserBase` serves as the request model for user login, with fields for `username` and `password`. The `Token` model is used as the response model, returning an `access_token` and its `token_type` upon successful authentication. 

The `UserInDB` model is used as a Data Transfer Object (DTO). It is used to communicate between different parts of the application (like from the service layer to the database layer) and encapsulate the data a user sends during the login process, including a hashed version of the user's password for secure storage.

The `TokenData` model is used to handle the data encapsulated in the token, specifically the `username` of the authenticated user. 

The FastAPI framework uses these models to automatically handle request validation, serialization, and documentation.