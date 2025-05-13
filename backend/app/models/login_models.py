For the given API endpoint, the Pydantic models have already been defined in the code provided as `Token`. However, for the consistency of the question, let's redefine it and also add a model for the user:

```python
from pydantic import BaseModel
from typing import Optional

class UserInDB(BaseModel):
    username: str
    hashed_password: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class Token(BaseModel):
    access_token: str
    token_type: str
```

`UserInDB` is the data transfer object for the user. It represents how user data is stored in the database. The `Token` model is used to structure the response from the `/login` endpoint.

Now we have models for both the request and response. The request model is `OAuth2PasswordRequestForm` provided by FastAPI. This model includes fields for `username` and `password`. The response model is `Token`, which includes fields for `access_token` and `token_type`.

In this example, we don't need Pydantic models for request data because FastAPI provides `OAuth2PasswordRequestForm` for the login form data. This form automatically includes fields for `username` and `password`.

In other cases, where we need to accept more complex data, we would define a Pydantic model that includes validation. For example, if we needed to accept an email and password, we might define a model like this:

```python
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
```