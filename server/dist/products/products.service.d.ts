import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedProductsDto } from './dto/pagination-product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    private products;
    getAll(page?: number, limit?: number): Promise<PaginatedProductsDto>;
    getById(_id: string): Promise<(import("mongoose").Document<unknown, {}, ProductDocument, {}> & Product & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<Product>;
    remove(id: string): Promise<Product | null>;
    update(id: string, productDto: UpdateProductDto): Promise<Product | null>;
}
