# Api для генерации авторизации

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
	"access_token": "sadasdsadsaddsa"
}
```

