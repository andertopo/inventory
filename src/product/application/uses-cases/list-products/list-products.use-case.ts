import { Inject, Injectable } from "@nestjs/common";
import UseCase from "src/core/use-case/use-case.interface";
import { Product } from "src/product/domain/entities/product.entity";
import type ProductRepository from "src/product/domain/repositories/product.repository";

@Injectable()
export class ListProductsUseCase implements UseCase<string, Product[]> {

    constructor(
        @Inject('IProductRepository') private readonly productRepository: ProductRepository
    ) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.getProducts();
    }
}