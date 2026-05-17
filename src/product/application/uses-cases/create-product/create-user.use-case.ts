import { Inject, Injectable } from "@nestjs/common";
import UseCase from "src/core/use-case/use-case.interface";
import { Product } from "src/product/domain/entities/product.entity";
import type ProductRepository from "src/product/domain/repositories/product.repository";
import { CreateProductDto } from "./create-user.dto";

@Injectable()
export class CreateProductUseCase implements UseCase<CreateProductDto, Product> {

    constructor(
        @Inject('IProductRepository') private readonly productRepository: ProductRepository
    ) {}

    async execute(input: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(input);
    }
}