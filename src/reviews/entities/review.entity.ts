import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Index } from 'typeorm';

@Index('idx_bookId', ['bookId'])
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  reviewText: string;

  @Column('int')
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
