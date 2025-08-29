import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  // Redirect,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(): Promise<Product[]> {
    console.log('getAll');
    return this.productService.getAll();
  }

  //  @Get(':id')
  // getOne(@Param() params) {
  //   return `getOne with id: ${params.id}`;
  // }

  @Get(':id')
  getOneV2(@Param('id') _id: string): Promise<Product | null> {
    // return `getOne V2 with id: ${id}`;
    return this.productService.getById(_id);
  }

  // @Post()
  // create(@Body() body) {
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('controll', 'text')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    // return `Title: ${createProductDto.title}, price: ${createProductDto.price}`;

    return this.productService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param() params): Promise<Product | null> {
    return this.productService.remove(params.id);
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product | null> {
    return this.productService.update(id, updateProductDto);
  }
}
