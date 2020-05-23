# Api для работы с кошельком

## Api генерации

> **Method**: GET
>
> **Auth**: True
>
> **Action**: /api/v1/wallet/generate

### Пример

##### Заголовок
1. Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIyNTU5MiwiZXhwIjoxNTkwODMwMzkyfQ.W3XyTP31HC92l19GffULKSvRXjoqQlTwkQvHvMiuFaU
2. Content-Type: application/json

##### Запрос
http://localhost/api/v1/wallet/generate

##### Ответ

Status: 200

```
{
    "id": 14,
    "address": "0x8Dc714FE167B5c318e5a337456cEAD313fB656b0",
    "publicKey": "8dc714fe167b5c318e5a337456cead313fb656b0",
    "privateKey": "685066066b124c0b88941504631a64b2483f0f58c5b517ccf54462906d455bf0",
    "message": "Wallet success generated!"
}
```

## Api для получения кошелька

> **Method**: GET
>
> **Auth**: True
>
> **Action**: /api/v1/wallet/all

### Пример

##### Заголовок
1. Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTU5MDIyNTU5MiwiZXhwIjoxNTkwODMwMzkyfQ.W3XyTP31HC92l19GffULKSvRXjoqQlTwkQvHvMiuFaU
2. Content-Type: application/json

##### Запрос
http://localhost/api/v1/wallet/all

##### Ответ

Status: 200

```
[
    {
        "id": 1,
        "address": "0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1",
        "publicKey": "959fd7ef9089b7142b6b908dc3a8af7aa8ff0fa1",
        "privateKey": "abf82ff96b463e9d82b83cb9bb450fe87e6166d4db6d7021d0c71d7e960d5abe",
        "type": "master",
        "createdAt": "2020-04-29T13:08:24.580Z"
    },
    {
        "id": 2,
        "address": "0x6BD7da46c802347Ce99dcd18eCad3084aA8ea717",
        "publicKey": "6bd7da46c802347ce99dcd18ecad3084aa8ea717",
        "privateKey": "83c21d70fabcea84a682dc2674dffda662531c40dba15f1fb02b4253c1bda673",
        "type": "simple",
        "createdAt": "2020-04-29T13:16:51.961Z"
    },
    {
        "id": 3,
        "address": "0x6d610fBEECfb19ED714aA44B9075159c1fD4c497",
        "publicKey": "6d610fbeecfb19ed714aa44b9075159c1fd4c497",
        "privateKey": "ac21e590fee5aa2ae8dc37b2fe1d755776bae2f696e75488366ac5f1617e82a9",
        "type": "simple",
        "createdAt": "2020-04-29T13:17:59.478Z"
    },
    {
        "id": 4,
        "address": "0xA7D7601eDaab9E79799e2dF64E20dcFDA19c40B5",
        "publicKey": "a7d7601edaab9e79799e2df64e20dcfda19c40b5",
        "privateKey": "ed499deb88810af0f66cb80688e4d81d96744d9182db692a44d161b6544c5c37",
        "type": "simple",
        "createdAt": "2020-04-29T14:18:29.197Z"
    },
    {
        "id": 5,
        "address": "0x9917163C314059a7Cb790FC78AfBBc4c14200250",
        "publicKey": "9917163c314059a7cb790fc78afbbc4c14200250",
        "privateKey": "e75438cd130287e604ee73d4ad0f6b1dfb8b2c0a1fb7eaffca1bced411b216bd",
        "type": "simple",
        "createdAt": "2020-05-11T10:20:47.664Z"
    }
]
```

