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
            "id": 3,
            "from": "0xF0291BE50725Ef8eA95694Ba18BF162026f8fCE9",
            "to": "0x6BD7da46c802347Ce99dcd18eCad3084aA8ea717",
            "value": "1",
            "transactionHash": "0x2bf6ba4bc53a8e11c9dd39ddd13923cf3565fbef14e3004be41fd94be13f1f27",
            "rawTransaction": {
                "id": "log_45e3d8b3",
                "raw": {
                    "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "topics": [
                        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                        "0x000000000000000000000000f0291be50725ef8ea95694ba18bf162026f8fce9",
                        "0x0000000000000000000000006bd7da46c802347ce99dcd18ecad3084aa8ea717"
                    ]
                },
                "event": "Transfer",
                "address": "0x4d6B0A160a7C672d77B3ED7C932297BF4004Ec5f",
                "removed": false,
                "logIndex": 4,
                "blockHash": "0xa2bf034787c708f802bdd7ba558d07cf2044a240adb7a9f98434888afeeb1ece",
                "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "blockNumber": 7967485,
                "returnValues": {
                    "0": "0xF0291BE50725Ef8eA95694Ba18BF162026f8fCE9",
                    "1": "0x6BD7da46c802347Ce99dcd18eCad3084aA8ea717",
                    "2": "1",
                    "to": "0x6BD7da46c802347Ce99dcd18eCad3084aA8ea717",
                    "from": "0xF0291BE50725Ef8eA95694Ba18BF162026f8fCE9",
                    "value": "1"
                },
                "transactionHash": "0x2bf6ba4bc53a8e11c9dd39ddd13923cf3565fbef14e3004be41fd94be13f1f27",
                "transactionIndex": 2
            },
            "type": "transfer",
            "createdAt": "2020-05-25T09:59:48.766Z"
        }
    ],
    "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": "10",
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

