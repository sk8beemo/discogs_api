# NestJS + Discogs API

Проект для работы с API Discogs. В данном приложении фронтенд загружает файлы, а бэкенд на NestJS заполняет метатеги для MP3-файлов с использованием данных из Discogs.

## Структура проекта

- **GraphQL** используется для общения между фронтендом и бэкендом.
- **Apollo Server** — это сервер, на котором работает GraphQL.
- В приложении реализован поиск релизов на **Discogs** и заполнение метатегов для MP3-файлов.

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name

2. Установите зависимости:

   ```bash
   npm install

3. Создайте файл .env и добавьте ваш токен API Discogs:

   ```bash
   DISCOGS_TOKEN=your_token_here

4. Запустите сервер:

 ```bash
   npm run start

## Available Queries

### `searchDiscogs`

Этот запрос позволяет выполнить поиск по релизам на Discogs.

#### Запрос:

```graphql
query SearchDiscogs($query: String!, $type: String, $page: Int, $perPage: Int) {
  searchDiscogs(input: { query: $query, type: $type, page: $page, perPage: $perPage }) {
    results {
      title
      year
      format
      country
    }
    total
    page
    pages
  }
}
