import { UpdateReviewDto } from './dto/UpdateReview.dto';
import { UsersService } from './../users/users.service';
import { MoviesService } from './../movies/movies.service';
import { CreateReviewDto } from './dto/CreateReview.dto';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>, private readonly movieService: MoviesService, private readonly userService: UsersService) {}
    async findReview(id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({ where: { id }, relations: ['reviewer']});
        if (!review) {
            throw new NotFoundException("Review with that Id doesn't exist")
        }
        return review
    }

    findAll(): Promise<Review[]> {
        return this.reviewRepository.find();
 
    }

    async create(createReviewDto: CreateReviewDto, user: { userId: number, username: string}) {
        // recieve movieId, check if existence in movieDB
        // save to reviewRepo
        const movie = await this.movieService.findById(createReviewDto.movieId);
        const newReview = this.reviewRepository.create(createReviewDto);
        newReview.movie = movie;
        const reviewer = await this.userService.findOne(user.username);
        newReview.reviewer = reviewer;

        return await this.reviewRepository.save(newReview);
    }
    
    async edit(id: number, updatedReviewDto: UpdateReviewDto, user: {userId: number, username: string}) {
        const review = await this.findReview(id);
        if (review.reviewer.id !== user.userId) {
            throw new ForbiddenException("Action Forbidden.", { cause: new Error(), description: 'Reviews can only be updated by the users that created them.' })
            
        }
        const updatedReview = this.reviewRepository.merge(review, updatedReviewDto);
        this.reviewRepository.save(updatedReview);
        
    }
    async delete(id: number, user: {userId: number, username: string}) {
        const review = await this.findReview(id);
        
        if (review.reviewer.id !== user.userId) {
            throw new ForbiddenException("Action Forbidden.", { cause: new Error(), description: 'Reviews can only be deleted by the users that created them.' })
        }
        await this.reviewRepository.delete(id);
    }
}
