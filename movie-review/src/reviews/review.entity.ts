import { Movie } from './../movies/movie.entity';
import { User } from './../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: "CASCADE" })
  movie: Movie;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  reviewer: User;
}