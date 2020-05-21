import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product-dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
