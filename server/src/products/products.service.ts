import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedProductsDto } from './dto/pagination-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private products: CreateProductDto[] = [];

  // async getAll(): Promise<Product[]> {
  //   return this.productModel.find().exec();
  // }

  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedProductsDto> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(_id: string) {
    return this.productModel.findById(_id); //.exec(); // .exec() повертає справжній Promise
  }

  // async create(
  //   productDto: CreateProductDto,
  //   files: Express.Multer.File[],
  // ): Promise<Product> {
  //   const newProduct = new this.productModel({
  //     ...productDto,
  //     images: files.map((file) => file.filename),
  //   });

  //   return newProduct.save();
  // }

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<Product> {
    
    const imageUrls = files.map((file) => file.filename);

    const newProduct = new this.productModel({
      ...createProductDto,
      imageUrl: imageUrls,
    });

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
