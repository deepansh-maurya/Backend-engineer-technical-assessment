import { Body, Controller, Get, Post } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @ApiOperation({ summary: 'Add a new book' })
    @ApiResponse({ status: 201, description: 'Book created successfully' })
    create(@Body() dto: CreateBookDto) {
        return this.booksService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all books' })
    findAll() {
        return this.booksService.findAll();
    }
}
