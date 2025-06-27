import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiBody,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('books/:bookId/reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @Post()
    @ApiOperation({ summary: 'Add a review for a specific book' })
    @ApiParam({ name: 'bookId', type: Number, example: 1 })
    @ApiBody({ type: CreateReviewDto })
    @ApiResponse({
        status: 201,
        description: 'Review successfully created',
    })
    create(
        @Param('bookId', ParseIntPipe) bookId: number,
        @Body() dto: CreateReviewDto,
    ) {
        return this.reviewsService.createReview(bookId, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reviews for a specific book' })
    @ApiParam({ name: 'bookId', type: Number, example: 1 })
    @ApiResponse({
        status: 200,
        description: 'List of reviews',
    })
    getAll(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.reviewsService.getReviewsByBookId(bookId);
    }
}
