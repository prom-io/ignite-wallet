# Api для работы с переводами

## Api для совершения перевода

> **Method**: POST
>
> **Auth**: True
>
> **Action**: /api/v1/transfer

### Описание параметров в теле запроса

Валидация:
```json
{
  "from": "required|string",
  "to": "required|string",
  "value": "required|numeric"
}
```

1. from - Адрес с какого кошелька будет совершаться перевод
2. to - Адрес на какой кошелек поступят средства
3. value - Кол-во переводимого пром токена

### Пример

##### Заголовок
1. Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIyNTU5MiwiZXhwIjoxNTkwODMwMzkyfQ.W3XyTP31HC92l19GffULKSvRXjoqQlTwkQvHvMiuFaU
2. Content-Type: application/json

##### Запрос
http://localhost/api/v1/balance/transfer

##### Тело запроса
```json
{
	"from": "0x6d610fBEECfb19ED714aA44B9075159c1fD4c497",
	"to": "0xD558eBf3246832083107b0c3673cb3D6F7c16586",
	"value": 2 
}
```

##### Ответ

Status: 200

```json
{
  "message": "Transfer success created!",
  "status": "PENDING"
}
```

## Api для получения статусов перевода

> **Method**: GET
>
> **Auth**: True
>
> **Action**: /api/v1/transfer/:address/:page/:limit

### Описание параметров в теле запроса

Валидация:
```json
{
  "address": "required|string",
  "page": "required|numeric",
  "limit": "required|numeric"
}
```

1. address - Адрес кошелька
2. page - Страница (данные для пагинации)
3. limit - Лимит (данные для пагинации)

### Пример

##### Заголовок
1. Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIyNTU5MiwiZXhwIjoxNTkwODMwMzkyfQ.W3XyTP31HC92l19GffULKSvRXjoqQlTwkQvHvMiuFaU
2. Content-Type: application/json

##### Запрос
http://localhost/api/v1/transfer/0x6d610fBEECfb19ED714aA44B9075159c1fD4c497/1/10

##### Ответ

Status: 200

```json
{
    "items": [
        {
            "id": 2,
            "from": "0x6d610fBEECfb19ED714aA44B9075159c1fD4c497",
            "to": "0xD558eBf3246832083107b0c3673cb3D6F7c16586",
            "value": 2,
            "status": "COMPLETE",
            "createdAt": "2020-05-23T11:51:33.716Z"
        }
    ],
    "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": "1",
        "totalPages": 1,
        "currentPage": "1"
    },
    "links": {
        "first": "",
        "previous": "",
        "next": "",
        "last": ""
    }
}
```

