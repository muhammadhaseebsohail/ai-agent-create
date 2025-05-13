The Pydantic models for the User input and output have been provided in the previous code. However, we are missing the Token model which will be used in the response of the login endpoint. Also, the `OAuth2PasswordRequestForm` is being used for the request model of the login endpoint.

Here are the missing models:

```python
from pydantic import BaseModel

class TokenData(BaseModel):
    username: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
```

The `Token` model will be used in the response of the login endpoint. It includes the `access_token` which holds the JWT token and the `token_type`.

The `TokenData` model is used for checking the token, it only has the `username` field.

The `OAuth2PasswordRequestForm` is used for the request in the "/token" endpoint. It is a built-in model that includes the `username`, `password`, `scope`, and `grant_type` fields. FastAPI provides automatic form data handling for this model. 

Remember to import these models at the top of your code:

```python
from . import models
```