import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { GetProductByIdUseCase } from 'src/product/application/uses-cases/get-product/get-product-by-id.use-case';
import { ListProductsUseCase } from 'src/product/application/uses-cases/list-products/list-products.use-case';
import { RemoveProductUseCase } from 'src/product/application/uses-cases/remove-product/remove-product.use-case';
import { UpdateProductUseCase } from 'src/product/application/uses-cases/update-product/update-product.use-case';
import { CreateProductUseCase } from 'src/product/application/uses-cases/create-product/create-user.use-case';
import { UpdateProductDto } from 'src/product/application/uses-cases/update-product/update-product.dto';

@Controller()
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) { }

  @Get()
  async list(): Promise<Product[]> {
    try {
      return await this.listProductsUseCase.execute();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new HttpException('Failed to fetch products', 500);
    }
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    try {
      return await this.createProductUseCase.execute(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Failed to create product', 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    try {
      const updateDto = new UpdateProductDto();
      updateDto._id = id;
      updateDto.description = product.description;
      updateDto.name = product.name;
      updateDto.price = product.price;
      return await this.updateProductUseCase.execute(updateDto);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new HttpException('Failed to update product', 500);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.removeProductUseCase.execute(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException('Failed to delete product', 500);
    }
  }
}

