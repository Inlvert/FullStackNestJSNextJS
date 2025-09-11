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
  Query,
  UploadedFiles,
  UseInterceptors,
  // Redirect,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer.config';
import { PaginatedProductsDto } from './dto/pagination-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<PaginatedProductsDto> {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    console.log('getAll');
    return this.productService.getAll(pageNum, limitNum);
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
  @UseInterceptors(FilesInterceptor('imageUrl', 5, multerConfig))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Product> {
    // return `Title: ${createProductDto.title}, price: ${createProductDto.price}`;
    console.log('Uploaded files:', files);
    
    // const images = files.map((file) => `/images/${file.filename}`);

    return this.productService.create(createProductDto, files);
  }

  @Delete(':id')
  remove(@Param() params): Promise<Product | null> {
    return this.productService.remove(params.id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product | null> {
    return this.productService.update(id, updateProductDto);
  }
}
