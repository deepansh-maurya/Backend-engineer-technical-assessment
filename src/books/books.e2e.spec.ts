import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Cache } from 'cache-manager';
import { AppModule } from '../../src/app.module';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let cacheManager: Cache;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    cacheManager = app.get('CACHE_MANAGER');
    await cacheManager.del('books'); 
  });

  it('/GET /books (cache miss path)', async () => {
    const response = await request(app.getHttpServer()).get('/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  

  afterAll(async () => {
    await app.close();
  });
});
