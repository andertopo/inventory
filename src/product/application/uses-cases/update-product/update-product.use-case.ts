import { Inject, Injectable } from "@nestjs/common";
import UseCase from "src/core/use-case/use-case.interface";
import { Product } from "src/product/domain/entities/product.entity";
import type ProductRepository from "src/product/domain/repositories/product.repository";
import { UpdateProductDto } from "./update-product.dto";

@Injectable()
export class UpdateProductUseCase implements UseCase<UpdateProductDto, Product> {

    constructor(
        @Inject('IProductRepository') private readonly productRepository: ProductRepository
    ) {}

    async execute(input: UpdateProductDto): Promise<Product> {
        return this.productRepository.updateProduct(input._id, input);
    }
}