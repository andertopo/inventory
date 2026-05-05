import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}
  
  getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  createProduct(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  updateProduct(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { upsert: true, new: true }).exec();
  }

  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
