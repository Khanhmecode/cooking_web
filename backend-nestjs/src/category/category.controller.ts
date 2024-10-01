import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, CommentDTO } from './dto';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories(){
    return this.categoryService.getAllCategories();
  }

  @Get(':slug-:id')
  getCategory(@Param() params: any) {    
    return this.categoryService.getCategory(params);
  }

  @Post('comment')
  upComment(@Body() comment: CommentDTO) {
    return this.categoryService.upComment(comment);
  }

  @Post('create-post')
  createPost(@Body() dto: CategoryDTO) {
    return this.categoryService.createPost(dto);
  }
}
