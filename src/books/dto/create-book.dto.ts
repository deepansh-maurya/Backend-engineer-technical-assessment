import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
    @ApiProperty({ example: 'Atomic Habits' })
    @IsString()
    title: string;

    @IsString()
    @ApiProperty({ example: 'James Clear' })
    author: string;

    @IsDateString()
    @ApiProperty({ example: '2018-10-16' })
    publishedAt: string;
}
