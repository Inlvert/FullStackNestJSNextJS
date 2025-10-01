import { Product } from '../schemas/product.schema';
export declare class PaginatedProductsDto {
    items: Product[];
    total: number;
    page: number;
    totalPages: number;
}
