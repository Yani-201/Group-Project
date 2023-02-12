import { UpdateReviewDto } from './dto/UpdateReview.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateReviewDto } from './dto/CreateReview.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
    
    @Get()
    getAllReviews() {
      return this.reviewsService.findAll();
    }

    @Get(':id')
    getReview(@Param('id', ParseIntPipe) id) {
      return this.reviewsService.findReview(id);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async createReview(@Body() createReviewDto: CreateReviewDto, @Request() req) {
      const {rating, reviewer, review} = await this.reviewsService.create(createReviewDto, req.user);
      const {username} = reviewer;
      return {rating, username, review};
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Patch(':id')
    editReview(@Param('id', ParseIntPipe) id, @Body() updateReviewDto: UpdateReviewDto, @Request() req) {
      return this.reviewsService.edit(id, updateReviewDto, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Delete(':id')
    deleteReview(@Param('id', ParseIntPipe) id, @Request() req) {
      return this.reviewsService.delete(id, req.user);
    }
    

}

