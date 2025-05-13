Here is an example of how you might implement this in FastAPI.

First, let's define the Pydantic models for the request and response:

```python
from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginResponse(BaseModel):
    detail: str
```

Now, let's define the API endpoint for user login:

```python
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from passlib.context import CryptContext
from starlette.responses import RedirectResponse
from pydantic import EmailStr

# Initialize app and security
app = FastAPI()
security = HTTPBasic()
crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dummy user data for testing
user_data = {
    "username": "testuser",
    "password": crypt_context.hash("testpassword")
}

@app.post("/login", response_model=UserLoginResponse)
def login(credentials: HTTPBasicCredentials = Depends(security)):
    """
    API endpoint for user login. On successful login, redirects to homepage.
    """
    username = credentials.username
    password = credentials.password

    if username not in user_data or not crypt_context.verify(password, user_data[username]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    
    # If the username and password are correct, redirect to homepage
    response = RedirectResponse(url='/homepage', status_code=status.HTTP_303_SEE_OTHER)
    return response
```

For the unit test:

```python
from fastapi.testclient import TestClient

def test_login():
    client = TestClient(app)
    response = client.post("/login", auth=("testuser", "testpassword"))
    assert response.status_code == 303
    assert response.headers["location"] == "/homepage"
```

Please note that you should replace the dummy user data with a proper authentication backend (like a database) in a real application. This example is simplified for the purpose of demonstration.