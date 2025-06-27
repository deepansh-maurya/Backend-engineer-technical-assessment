import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepo: Repository<Book>,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async create(dto: CreateBookDto) {
        const book = this.bookRepo.create(dto);
        return this.bookRepo.save(book);
    }

    async findAll() {
    try {
      const cached = await this.cacheManager.get('books');
      if (cached) {
        return cached;
      }
    } catch (err) {
      console.error(' Redis unavailable - cache read failed:', err.message);
    }

    const books = await this.bookRepo.find();

    try {
      await this.cacheManager.set('books', books, 60);
    } catch (err) {
      console.error(' Redis unavailable - cache write failed:', err.message);
    }
    return books;
  }
}
