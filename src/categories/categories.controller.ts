import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('api')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}
    
    @ApiOperation({summary: 'Add new category'})
    @ApiResponse({status: 201, type: Category})
    @Post('categories')
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @ApiOperation({summary: 'Update category by id or name'})
    @ApiResponse({status: 200, type: Category})
    @Put('categories')
    updateCategory(@Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(dto);
    }

    @ApiOperation({summary: 'Delete category'})
    @ApiResponse({status: 200, type: Category})
    @Delete('/categories/:id')
    delete(@Param('id') id: number) {
        return this.categoriesService.delete(id);
    }

    @ApiOperation({summary: 'Get category by id'})
    @ApiResponse({status: 200, type: Category})
    @Get('/categories/:id')
    getById(@Param('id') id: number) {
        return this.categoriesService.getOneById(id);
    }

    @ApiOperation({summary: 'Get category by name'})
    @ApiResponse({status: 200, type: Category})
    @Get('/categories/name/:name')
    getByName(@Param('name') name: string) {
        return this.categoriesService.getOneByName(name);
    }

    @ApiOperation({summary: 'Get all categories'})
    @ApiResponse({status: 200, type: [Category]})
    @Get('/categories')
    getAll() {
        return this.categoriesService.getAll();
    }
}
