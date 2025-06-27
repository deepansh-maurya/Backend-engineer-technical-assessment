import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Book } from './books/entities/book.entity';
import { Review } from './reviews/entities/review.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import 'dotenv/config'; 

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
      ttl: parseInt(process.env.REDIS_TTL ?? '60', 10),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [Book, Review],
      synchronize: true,
      migrationsRun: true,
    }),
    BooksModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
