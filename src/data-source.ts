import { DataSource } from 'typeorm';
import { Book } from './books/entities/book.entity';
import { Review } from './reviews/entities/review.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // 👈 load .env variables

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, Review],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});