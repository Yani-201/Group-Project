import { UsersService } from './../users/users.service';
import { User } from './../users/user.entity';
import { UpdateMovieDto } from './dto/Update.Movie.dto';
import { CreateMovieDto } from './dto/CreateMovie.dto';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, NotFoundException, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movie) private moviesRepository: Repository<Movie>, private readonly userService: UsersService) {}

    findAll (): Promise<Movie[]> {
        return this.moviesRepository.find();
    }

    findOne(title: string): Promise<Movie> {
        return this.moviesRepository.findOneBy({ title })
    }

    async createMovie(createMovieDto: CreateMovieDto, user: User) {
        const existingMovie = await this.findOne(createMovieDto.title);
        if (existingMovie) {
            throw new BadRequestException('Movie already exists', { cause: new Error(), description: 'That movie already exists, please search for it to add a review.' })
        }
        const newMovie = this.moviesRepository.create(createMovieDto);
        newMovie.createdBy = await this.userService.findOne(user.username);
        return this.moviesRepository.save(newMovie);
    }

    async remove(id: number, user: {userId: number, username: string}) {
        const movie = await this.findById(id);
        if (movie.createdBy.id !== user.userId) {
            throw new ForbiddenException("Action Forbidden.", { cause: new Error(), description: 'Movies can only be deleted by the users that created them.' })
        }
        await this.moviesRepository.delete(id);
    }

    async updateMovie(id: number, updateMovieDto: UpdateMovieDto, user) {
        const movie = await this.findById(id);
        if (movie.createdBy.id !== user.userId) {
            throw new ForbiddenException("Action Forbidden.", { cause: new Error(), description: 'Movies can only be updated by the users that created them.' })
        }
        const updatedMovie = this.moviesRepository.merge(movie, updateMovieDto);
        await this.moviesRepository.save(updatedMovie);
    }

    async findById(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { id }, relations: ['createdBy', 'reviews']});
        if (!movie) {
            throw new NotFoundException("Movie doesn't exist.");
        }
        return movie;
    }
}
