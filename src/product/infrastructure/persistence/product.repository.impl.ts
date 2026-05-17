import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/product/domain/entities/product.entity";
import ProductRepository from "src/product/domain/repositories/product.repository";
import { ProductMapper } from "./mongoose/product.mapper";
import { ProductDocument } from "./mongoose/product.schema";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        @InjectModel(ProductDocument.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        console.log('productos', this.productModel.name, products);
        return products.map(ProductMapper.toDomain);
    }
    
    async getProductById(id: string): Promise<Product | null> {
        const product = await this.productModel.findById(id);
        return product ? ProductMapper.toDomain(product) : null;
    }
    
    async createProduct(product: Partial<Product>): Promise<Product> {
        const productCreated = new this.productModel(product);
        const saved = await productCreated.save();
        return ProductMapper.toDomain(saved);
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
        const productChanged = await this.productModel.findByIdAndUpdate(id, product, { upsert: true, new: true }).exec();
        return ProductMapper.toDomain(productChanged);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}