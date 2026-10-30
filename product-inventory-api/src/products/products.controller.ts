import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { promises } from 'dns';
import { CreateProductDto } from './dto/create-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any>{
    return this.productsService.create(createProductDto);
  }
  
  @Get()
  async findAll(): Promise<any>{
    return this.productsService.findAll();
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() partialUpdateProductDto: PartialUpdateProductDto): Promise<any>{
    return this.productsService.update(id, partialUpdateProductDto);
  }

  @Put('/:id')
  async replace(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<any>{
    return this.productsService.replace(id, updateProductDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<any>{
    return this.productsService.remove(id);
  }

  @Get('/category/:category')
  async findByCategory(@Param('category') category: string): Promise<any>{
    return this.productsService.findByCategory(category);
  }

  @Get('/search')
  async search(@Query('keyword') keyword: string): Promise<any>{
    return this.productsService.search(keyword);
  }

  @Patch('/:id/toggle')
  async toggleActive(@Param('id') id: string): Promise<any>{
    return this.productsService.toggleActive(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any>{
    return this.productsService.findOne(id);
  }
}
