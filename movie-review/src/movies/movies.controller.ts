import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateMovieDto } from './dto/Update.Movie.dto';
import { CreateMovieDto } from './dto/CreateMovie.dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Delete, ParseIntPipe, UseGuards, Request, Res, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Param, Patch } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path'

export const storage = {
	storage: diskStorage({
		destination: './covers',
		filename: (req, file, cb) => {
			const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
			const extension: string = path.parse(file.originalname).ext;
			cb(null, `${filename}${extension}`)
		}
	})
}

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

	@Get('cover/:imageName')
	getMovieCover(@Param('imageName') imageName:string, @Res() res) {
		return res.sendFile(path.join(process.cwd(), 'covers/' + imageName))
	}

	@Get(':id/reviews')
	@UseInterceptors(ClassSerializerInterceptor)
	getReviewsForMovie(@Param('id', ParseIntPipe) id) {
		return this.moviesService.findReviews(id);
	}

    @UseGuards(JwtAuthGuard)
	@Post() 
	@UsePipes(ValidationPipe)
	@UseInterceptors(FileInterceptor('coverPage', storage))
	createMovie(@Body() createMovieDto: CreateMovieDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
		console.log(file)
		console.log(createMovieDto)
		return this.moviesService.createMovie(createMovieDto, req.user, file.path);
	}

    @UseGuards(JwtAuthGuard)
	@Delete(":id")
	removeMovie(@Param('id', ParseIntPipe) id:number, @Request() req) {
		return this.moviesService.remove(id, req.user);
	}

    @UseGuards(JwtAuthGuard)
	@Patch(':id')
	@UsePipes(ValidationPipe)
	@UseInterceptors(FileInterceptor('coverPage', storage))
	updateMovie(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
		return this.moviesService.updateMovie(id, updateMovieDto, req.user, file.path);
	}

	

}
