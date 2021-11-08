import {
  Body, //
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UpdateResult } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CustomValidationPipe } from './pipe/product.validation.pipe';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post()
  async create(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const data = await this.productService.create(createProductDto);
    return plainToClass(Product, data);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const data = await this.productService.update(id, updateProductDto);
    console.log(data);
    return plainToClass(Product, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
