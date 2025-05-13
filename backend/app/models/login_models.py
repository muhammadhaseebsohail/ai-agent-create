In the provided code, there is no explicit response model defined. However, the login endpoint is returning a RedirectResponse, which will redirect the client to a different URL (in this case, '/home'). For the purpose of this task, let's assume that the '/home' endpoint returns a User object. Here is how we can define the request/response models and data transfer object:

1. Pydantic models for request/response
```python
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    password: str

class UserLogin(UserBase):
    pass

class User(BaseModel):
    id: int
    email: str
    name: str
    is_active: bool
    class Config:
        orm_mode = True
```

In this case, UserLogin model is used as a request model and User model is used as a response model.

2. Data Transfer Object
```python
from typing import Dict

class UserDTO:
    def __init__(self, user: Dict):
        self.id = user['id']
        self.email = user['email']
        self.name = user['name']
        self.is_active = user['is_active']
```

The UserDTO is a data transfer object, used to transfer data between different parts of the application. It provides a way to handle data in a more abstract way without needing to worry about the details of how the data is stored or retrieved. 

Please note that in the actual implementation, the DTO object should map to the database model or ORM object. The provided UserDTO is a simple example and doesn't have any methods to interact with a database. The actual DTO object should have methods like create, update, delete, and more. Besides, the DTO object can be used to validate the incoming data before it is sent to the database.