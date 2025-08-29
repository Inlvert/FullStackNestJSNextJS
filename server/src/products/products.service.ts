import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private products: CreateProductDto[] = [];

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(_id: string) {
    return this.productModel.findById(_id); //.exec(); // .exec() повертає справжній Promise
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);

    return newProduct.save();
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
