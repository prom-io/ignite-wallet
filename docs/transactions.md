# Api для работы с транзакциями

## Api для получения транзакции

> **Method**: GET
>
> **Auth**: True
>
> **Action**: /api/v1/transactions/:address/:page/:limit

### Описание параметров
1. address - Адрес кошелька
2. page - Страница (данные для пагинации)
3. limit - Лимит (данные для пагинации)

### Пример

##### Заголовок
1. Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIyNTU5MiwiZXhwIjoxNTkwODMwMzkyfQ.W3XyTP31HC92l19GffULKSvRXjoqQlTwkQvHvMiuFaU
2. Content-Type: application/json

##### Запрос
http://localhost/api/v1/transactions/0xF0291BE50725Ef8eA95694Ba18BF162026f8fCE9/1/10

##### Ответ

Status: 200

```
{
    "items": [
        {
            "id": 1,
            "from": "0xF0291BE50725Ef8eA95694Ba18BF162026f8fCE9",
            "to": "0x6d610fBEECfb19ED714aA44B9075159c1fD4c497",
            "value": "10",
            "type": "transfer",
            "createdAt": "2020-05-23T09:24:34.847Z"
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

