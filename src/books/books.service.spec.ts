import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Cache } from 'cache-manager';

describe('BooksService', () => {
  let service: BooksService;
  let mockCache: Partial<Cache>;
  let mockRepo: any;

  beforeEach(async () => {
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
    };

    mockRepo = {
      find: jest.fn().mockResolvedValue([{ id: 1, title: 'Sample Book' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: mockRepo },
        { provide: 'CACHE_MANAGER', useValue: mockCache },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return books from cache if available', async () => {
    mockCache.get = jest.fn().mockResolvedValue([{ id: 1, title: 'Cached Book' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, title: 'Cached Book' }]);
  });

  it('should fetch from DB and set cache if cache is empty', async () => {
    mockCache.get = jest.fn().mockResolvedValue(null);
    const result = await service.findAll();
    expect(mockRepo.find).toHaveBeenCalled();
    expect(mockCache.set).toHaveBeenCalledWith('books', result, 60);
  });


  it('should create a new book', async () => {
    const newBookDto = { title: 'New Book', author: 'Deep', publishedAt: '2018-10-16' };

    // Mock repository behavior
    mockRepo.create = jest.fn().mockReturnValue(newBookDto);
    mockRepo.save = jest.fn().mockResolvedValue({ id: 2, ...newBookDto });

    const result = await service.create(newBookDto);

    expect(mockRepo.create).toHaveBeenCalledWith(newBookDto);
    expect(mockRepo.save).toHaveBeenCalledWith(newBookDto);
    expect(result).toEqual({ id: 2, title: 'New Book', author: 'Deep', publishedAt: '2018-10-16', });
  })
});
