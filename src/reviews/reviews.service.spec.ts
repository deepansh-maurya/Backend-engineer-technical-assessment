import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let mockRepo: Partial<Repository<Review>>;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: getRepositoryToken(Review), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should create a new review for a book', async () => {
    const reviewDto = {
      reviewText: 'Great book!',
      rating: 5,
      bookId: 1,
    };

    const mockReview = {
      id: 10,
      ...reviewDto,
      createdAt: new Date(),
    };

    (mockRepo.create as jest.Mock).mockReturnValue(mockReview);
    (mockRepo.save as jest.Mock).mockResolvedValue(mockReview);

    const result = await service.createReview(reviewDto.bookId, reviewDto);

    expect(mockRepo.create).toHaveBeenCalledWith(reviewDto);
    expect(mockRepo.save).toHaveBeenCalledWith(mockReview);
    expect(result).toEqual(mockReview);
  });
});
