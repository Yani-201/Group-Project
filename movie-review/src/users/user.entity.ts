import { Movie } from './../movies/movie.entity';
import { Review } from './../reviews/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Movie, (movie) => movie.createdBy)
  created: Movie[];

}