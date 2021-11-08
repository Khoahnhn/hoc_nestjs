import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
