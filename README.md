# 📚 Book Review API

A simple backend API built with **NestJS**, **TypeORM**, and **PostgreSQL** that allows users to add books and post reviews. It also integrates **Redis** for caching and includes automated tests.

---

## 🚀 Features

- RESTful API for managing books and reviews
- OpenAPI (Swagger) documentation
- PostgreSQL via TypeORM with migrations
- Redis caching for `/books` endpoint
- Error handling for cache failure
- Unit and integration testing with Jest

---

## 🔧 Installation

```bash
# install dependencies
yarn install

# set up environment (see .env.example)
cp .env.example .env
```

---

## 🛠️ Running the Application

```bash
# start in development mode
yarn start:dev
```

---

## 🔄 Running Migrations

```bash
# run DB migrations
yarn migration:run

# generate a new migration
yarn migration:generate -n MigrationName
```

---

## 🧪 Running Tests

```bash
# unit and service tests
yarn test

# end-to-end tests
yarn test:e2e
```

---

## 📌 API Endpoints

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| GET    | /books                   | List all books              |
| POST   | /books                   | Add a new book              |
| GET    | /books/:id/reviews       | Get reviews for a book      |
| POST   | /books/:id/reviews       | Add a review to a book      |

---

## 📑 OpenAPI Docs

Access the Swagger UI at: `http://localhost:3000/api`

---

## 🧠 Bonus: GraphQL Extension (Design Prompt)

If extended to support GraphQL + subscriptions:

- Use Apollo GraphQL with Redis PubSub
- Add `reviewAdded(bookId: ID!)` subscription
- Secure with auth guard using JWT
- Redis for distributed event propagation

---

## 🗂️ Project Structure

- `src/books`: Book controller, service, and entity
- `src/reviews`: Review controller, service, and entity
- `src/app.module.ts`: App bootstrap
- `src/data-source.ts`: TypeORM config

---

## ✅ Requirements Coverage

- [x] API Design (REST, Swagger)
- [x] Data Modeling (TypeORM, migrations, indexing)
- [x] Redis Cache Integration
- [x] Error Handling for Cache Failures
- [x] Unit and Integration Testing

---

## 🧑‍💻 Author

Built by Deepansh Maurya