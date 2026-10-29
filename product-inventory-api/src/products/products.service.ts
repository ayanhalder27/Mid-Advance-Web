import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) private productRepo: Repository<Products>){}

    async create(createProductDto: CreateProductDto): Promise<any>{
        try{
            const product = await this.productRepo.save(await this.productRepo.create(createProductDto))
            return {
                message: "Product created successfully",
                data: product
            };
        }
        catch{
            throw new BadRequestException("Database error. Failde to create product.")
        }
    }
    async findAll(): Promise<any>{
        try{
            return {
                message: "All products fetched successfully",
                count: await this.productRepo.count(),
                data: await this.productRepo.find()
            };
        }
        catch{
            throw new BadRequestException("Database error. Failde to create product.")
        }
    }
    async findOne(id: string): Promise<any>{
        try{
            const product = await this.productRepo.findOne({
                    where: {
                        id: parseInt(id)
                    }
                })
            if (product != null){
                return {
                    message: "Product fetched successfully",
                    data: product
                };
            }
            else{
                return `product with id: ${id} not found`;
            }
        }
        catch{
            throw new BadRequestException("Database error. Failde to create product.")
        }
    }
    update(){}
    replace(){}
    remove(){}
    findByCategory(){}
    search(){}
    toggleActive(){}
}
