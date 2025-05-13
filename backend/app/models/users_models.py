The Pydantic models for request and response have been included in the sample code provided. They are as follows:

For request:

```python
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
```

In this case, `UserBase` is a base model which consists of an email field. `UserCreate` inherits from `UserBase` and adds a password field, which is necessary for creating a new user.

For response:

```python
class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
```

Here, the `User` model extends `UserBase` by adding an `id` (which is automatically generated upon user creation) and an `is_active` field (which indicates whether the user's account is active). The `orm_mode` option is set to `True` to allow access to properties (like `id` and `is_active`) in the same way as normal model attributes.

In terms of data transfer objects (DTOs), the `UserCreate` and `User` Pydantic models act as DTOs. They are used to validate data and transfer it between different parts of the application (for example, between the API and the service layer, or between the service layer and the database). The `UserCreate` model is used to receive data from the API client, while the `User` model is used to return data to the client.