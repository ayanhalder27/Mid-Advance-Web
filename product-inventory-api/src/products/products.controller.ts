import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { promises } from 'dns';
import { CreateProductDto } from './dto/create-product.dto.js';

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

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any>{
    return this.productsService.findOne(id);
  }
  update(){}
  replace(){}
  remove(){}
  findByCategory(){}
  search(){}
  toggleActive(){}
}
