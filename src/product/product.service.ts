import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // return await this.productRepository.update(id, updateProductDto);

    const product = await this.getById(id);

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.cost = updateProductDto.cost;
    return await product.save();
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
