import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { PaginatedProductsDto } from './dto/pagination-product.dto';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getAll(page: string, limit: string): Promise<PaginatedProductsDto>;
    getOneV2(_id: string): Promise<Product | null>;
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<Product>;
    remove(params: any): Promise<Product | null>;
    update(updateProductDto: UpdateProductDto, id: string): Promise<Product | null>;
}
