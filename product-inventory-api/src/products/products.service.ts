import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity.js';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { promises } from 'dns';

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
            throw new BadRequestException("Database error. Failed to create product.");
        }
    }

    async findAll(): Promise<any>{
        try{
            return {
                message: "All products fetched successfully",
                count: await this.productRepo.count(),
                data: await this.productRepo.find({
                    order: {
                        createdAt: 'DESC'
                    }
                })
            };
        }
        catch{
            throw new BadRequestException("Database error. Failed to fetch products.");
        }
    }

    async findOne(id: string): Promise<any>{
        let product;
        try{
            product = await this.productRepo.findOne({
                    where: {
                        id: parseInt(id)
                    }
                })
        }
        catch{
            throw new BadRequestException("Database error. Failed to fetch product.");
        }

        if (product != null){
            return {
                message: "Product fetched successfully",
                data: product
            };
        }
        else{
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
    }

    async update(id: string, partialUpdateProductDto: PartialUpdateProductDto): Promise<any>{
        let res;
        try{
            res = (await (this.productRepo.update(id, partialUpdateProductDto))).affected;
        }
        catch{
            throw new BadRequestException("Database error. Failed to update product.");
        }

        if(res != 0){
            return{
                message: "Product details updated sucessfully",
                data: await this.findOne(id)
            }
        }
        
        else{
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
    }

    async replace(id: string, updateProductDto: UpdateProductDto): Promise<any>{
        let res;
        try{
            res = (await (this.productRepo.update(id, updateProductDto))).affected;
        }
        catch{
            throw new BadRequestException("Database error. Failed to update product.");
        }

        if(res != 0){
            return{
                message: "Product details updated sucessfully",
                data: await this.findOne(id)
            }
        }
        
        else{
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
    }

    async remove(id: string): Promise<any>{
        let res;
        try{
            res = (await (this.productRepo.softDelete(id))).affected;
        }
        catch{
            throw new BadRequestException("Database error. Failed to update product.");
        }

        if(res != 0){
            return{
                message: "Product removed sucessfully",
                id: id
            }
        }
        
        else{
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
    }
    async findByCategory(category: string): Promise<any>{
        try{
            return {
                message: `All products with category: ${category} fetched successfully`,
                count: await this.productRepo.count({
                    where: {
                        category: category
                    }
                }),
                data: await this.productRepo.find({
                    where: {
                        category: category
                    }
                })
            };
        }
        catch{
            throw new BadRequestException("Database error. Failed to fetch products.");
        }
    }

    async search(keyword: string): Promise<any>{
        try{
            return {
                message: "Product found",
                count: await this.productRepo.count({
                        where: {
                            name: ILike(`%${keyword}%`)
                        }
                    }), 
                data: await this.productRepo.find({
                        where: {
                            name: ILike(`%${keyword}%`)
                        }
                    })
            };
        }
        catch{
            throw new BadRequestException("Database error. Failed to fetch product.");
        }
    }

    async toggleActive(id: string): Promise<any>{
        let res;
        try{
            res = (await (this.productRepo.update(id, {
                isActive: !(await this.productRepo.findOne({
                    select:{isActive: true},
                    where: {id: parseInt(id)}
                }))?.isActive
            }))).affected;
        }
        catch{
            throw new BadRequestException("Database error. Failed to update product.")
        }

        if(res != 0){
            return{
                message: "Active status of the product updated successfully",
                data: await this.findOne(id)
            }
        }
        
        else{
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
    }
}
