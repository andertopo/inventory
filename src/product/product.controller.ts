import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async list(): Promise<Product[]> {
    try {
      return await this.productService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new HttpException('Failed to fetch products', 500);
    }
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    try {
      return await this.productService.createProduct(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Failed to create product', 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    try {
      return await this.productService.updateProduct(id, product);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new HttpException('Failed to update product', 500);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException('Failed to delete product', 500);
    }
  }
}

