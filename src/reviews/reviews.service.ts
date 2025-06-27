import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async createReview(bookId: number, dto: CreateReviewDto) {
    const review = this.reviewRepo.create({ ...dto, bookId });
    return this.reviewRepo.save(review);
  }

  async getReviewsByBookId(bookId: number) {
    return this.reviewRepo.find({
      where: { bookId },
      order: { createdAt: 'DESC' },
    });
  }
}
