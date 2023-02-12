import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateMovieDto } from './dto/Update.Movie.dto';
import { CreateMovieDto } from './dto/CreateMovie.dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Delete, ParseIntPipe, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Param, Patch } from '@nestjs/common/decorators';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}
	@Get()
	getAllMovies() {
		return this.moviesService.findAll(); 
  	}

	@Get(':id')
	@UseInterceptors(ClassSerializerInterceptor)
	getMovie(@Param('id', ParseIntPipe) id) {
		return this.moviesService.findById(id);
	}

    @UseGuards(JwtAuthGuard)
	@Post() 
	@UsePipes(ValidationPipe)
	createMovie(@Body() createMovieDto: CreateMovieDto, @Request() req) {
		return this.moviesService.createMovie(createMovieDto, req.user);
	}

    @UseGuards(JwtAuthGuard)
	@Delete(":id")
	removeMovie(@Param('id', ParseIntPipe) id:number, @Request() req) {
		return this.moviesService.remove(id, req.user);
	}

    @UseGuards(JwtAuthGuard)
	@Patch(':id')
	@UsePipes(ValidationPipe)
	updateMovie(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto, @Request() req) {
		return this.moviesService.updateMovie(id, updateMovieDto, req.user);
	}



}
