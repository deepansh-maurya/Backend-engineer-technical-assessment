import { DataSource } from 'typeorm';
import { Book } from './books/entities/book.entity';
import { Review } from './reviews/entities/review.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'book-review',
  entities: [Book, Review],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
