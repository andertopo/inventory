import { Inject, Injectable } from "@nestjs/common";
import UseCase from "src/core/use-case/use-case.interface";
import { Product } from "src/product/domain/entities/product.entity";
import type ProductRepository from "src/product/domain/repositories/product.repository";

@Injectable()
export class GetProductByIdUseCase implements UseCase<string, Product | null> {

    constructor(
        @Inject('IProductRepository') private readonly productRepository: ProductRepository
    ) {}

    async execute(input: string): Promise<Product | null> {
        return this.productRepository.getProductById(input);
    }
}