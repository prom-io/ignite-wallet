# Api для авторизации

> **Method**: Post
>
> **Action**: /api/v1/auth/login

## Пример

#### Запрос
http://localhost/api/v1/auth/login

#### Тело запроса
```
{
	"username": "username",
	"password": "password"
}
```

#### Ответ

Status: 200

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIzOTE4OCwiZXhwIjoxNTkwODQzOTg4fQ.3sHpMYmXHymAx0ou0brow5jOp3pLRa2QXRY5wSDsJUM"
}
```

