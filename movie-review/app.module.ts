import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/review.entity';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/movie.entity';
import { User } from './users/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'moviereview',
    entities: [User, Movie, Review],
    synchronize: false,
  }), UsersModule, AuthModule, MoviesModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
