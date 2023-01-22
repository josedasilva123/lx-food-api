Uma API para um site de receitas em Node JS, utilizada para ensinar front-end

## Rotas de Usuário

### Registro /user/ POST

Padrão de corpo

```json
{
   "name": "Alex Conder",
   "email": "example@gmail.com",
   "password": "@12Patinhos"
}
```

Padrão de resposta

```json
{
   "message": "Cadastro realizado com sucesso!"
}
```

### Login /user/login POST

Padrão de corpo

```json
{
   "email": "example@gmail.com",
   "password": "@12Patinhos"
}
```

Padrão de resposta

```json
{
   "user": {
      "id": "6368fd43446e687ef917f6fd",
      "name": "Alex Conder",
      "email": "alex.v.conder@gmail.com",
      "favoriteRecipes": []
   },
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjhmZDQzNDQ2ZTY4N2VmOTE3ZjZmZCIsImlhdCI6MTY2ODYyNzQyNiwiZXhwIjoxNjY4NjcwNjI2fQ.UAM0XmnwfsaHT045QbBlmGxuQZ5cjN9KGGkuTvAJ_YA"
}
```

### Autologin /user/autologin GET

Não é necessário um corpo para essa rota

Envie a token no `headers` como auth

```json
{
    "headers:" {
        "auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjhmZDQzNDQ2ZTY4N2VmOTE3ZjZmZCIsImlhdCI6MTY2ODYyNzQyNiwiZXhwIjoxNjY4NjcwNjI2fQ.UAM0XmnwfsaHT045QbBlmGxuQZ5cjN9KGGkuTvAJ_YA"
    }
}
```

(Este modelo vai consistir em todas as rotas que precisarem de autorização)

Padrão de resposta

```json
{
   "user": {
      "_id": "6368fd43446e687ef917f6fd",
      "name": "Alex Conder",
      "email": "alex.v.conder@gmail.com",
      "favoriteRecipes": []
   }
}
```

## Rotas de Receitas

### Criar receita /recipe POST (Precisa de autorização)

O corpo precisa ser `multipart/formdata` e precisa conter os seguintes campos

- file - arquivo de imagem png ou jpg
- title - string
- content - string
- categories - strigfied array

Padrão de resposta

```json
{
   "recipe": {
      "userId": "6368fd43446e687ef917f6fd",
      "title": "Receita Exemplo",
      "content": "O conteúdo é obrigatório",
      "thumbnail_filename": "bdacb8b4ff4e6eb74459d37cd6bf7ca9",
      "thumbnail_url": "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/bdacb8b4ff4e6eb74459d37cd6bf7ca9",
      "reviews": [],
      "categories": ["categoria"],
      "_id": "63753f5153c707b2ad83ecbd",
      "createdAt": "2022-11-16T19:51:45.790Z",
      "updatedAt": "2022-11-16T19:51:45.790Z",
      "__v": 0
   },
   "message": "Receita criada com sucesso!"
}
```

### Editar receita /recipe/:recipeId PATCH (Precisa de autorização)

O corpo precisa ser `multipart/formdata` e precisa conter os seguintes campos

- file - arquivo de imagem png ou jpg (opcional)\*
- title - string
- content - string
- categories - strigfied array

Padrão de resposta

```json
{
   "message": "Receita atualizada com sucesso!"
}
```

### Deletar receita /recipe/:recipeId DELETE (Precisa de autorização)

Não é necessário um corpo somente o parâmetro via URL

```json
{
   "message": "Receita excluída com sucesso!"
}
```

### Retornar receitas /recipe GET

Padrão de resposta

```json
{
   "count": 1,
   "recipes": [
      {
         "_id": "63753f5153c707b2ad83ecbd",
         "userID": "6368fd43446e687ef917f6fd",
         "title": "Receita Exemplo",
         "content": "O conteúdo é obrigatório",
         "thumbnail_filename": "bdacb8b4ff4e6eb74459d37cd6bf7ca9",
         "thumbnail_url": "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/bdacb8b4ff4e6eb74459d37cd6bf7ca9",
         "reviews": [],
         "categories": ["categoria"],
         "createdAt": "2022-11-16T19:51:45.790Z",
         "updatedAt": "2022-11-16T19:51:45.790Z",
         "__v": 0
      }
   ]
}
```

#### Parâmetros possíveis

| Parâmetro | Descrição |
| ------ | ------ |
| skip | Controle de paginação (quantos itens devo ignorar) |
| limit | Controle de paginação (quantos itens por página) |
| userId | Buscar receitas de um usuário específico |
| category | Busca receitas de uma categoria específica |
| search | Parâmetro de busca |

### Retornar uma receita específica /recipe/63753f5153c707b2ad83ecbd GET

Padrão de resposta

```json
{
   "recipe": {
      "_id": "63753f5153c707b2ad83ecbd",
      "userID": "6368fd43446e687ef917f6fd",
      "title": "Receita Exemplo",
      "content": "O conteúdo é obrigatório",
      "thumbnail_filename": "bdacb8b4ff4e6eb74459d37cd6bf7ca9",
      "thumbnail_url": "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/bdacb8b4ff4e6eb74459d37cd6bf7ca9",
      "reviews": [],
      "categories": ["categoria"],
      "createdAt": "2022-11-16T19:51:45.790Z",
      "updatedAt": "2022-11-16T19:51:45.790Z",
      "__v": 0
   }
}
```

## Rotas de Categoria

### Criar uma categoria /category POST (Precisa de autorização)

Padrão de corpo

```json
{
   "slug": "frutas",
   "name": "Frutas"
}
```

Padrão de resposta

```json
{
   "category": {
      "slug": "frutas",
      "name": "Frutas",
      "_id": "637e1b659e648375aeed83e9",
      "createdAt": "2022-11-23T13:08:53.200Z",
      "updatedAt": "2022-11-23T13:08:53.200Z",
      "__v": 0
   },
   "message": "Categoria criada com sucesso."
}
```

### Deletar uma categoria /category/:categoryId DELETE (Precisa de autorização)

Está rota não precisa de um corpo

Padrão de resposta

```json
{
   "message": "Categoria excluida com sucesso!"
}
```

### Retornar categorias /category

Está rota não precisa de um corpo

Padrão de resposta

```json
{
   "categories": [
      {
         "_id": "637e1c799e648375aeed83ef",
         "slug": "frutas",
         "name": "Frutas",
         "createdAt": "2022-11-23T13:13:29.958Z",
         "updatedAt": "2022-11-23T13:13:29.958Z",
         "__v": 0
      }
   ]
}
```

### Padrão de erro

```json
{
   "error": "Mensagem de erro..."
}
```
