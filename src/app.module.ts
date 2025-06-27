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

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      host: 'localhost',
      port: 6379,
      ttl: 60, // default cache time in seconds
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'book-review',
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
