import { IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: 'Amazing book on habits!' })
    @IsString()
    reviewText: string;

    @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}
