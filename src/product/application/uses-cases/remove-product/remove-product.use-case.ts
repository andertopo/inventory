import { Inject, Injectable } from "@nestjs/common";
import UseCase from "src/core/use-case/use-case.interface";
import type ProductRepository from "src/product/domain/repositories/product.repository";

@Injectable()
export class RemoveProductUseCase implements UseCase<string, void> {

    constructor(
        @Inject('IProductRepository') private readonly productRepository: ProductRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.productRepository.deleteProduct(id);
    }
}