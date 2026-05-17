import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { CreateProductUseCase } from "src/product/application/uses-cases/create-product/create-user.use-case";
import { GetProductByIdUseCase } from "src/product/application/uses-cases/get-product/get-product-by-id.use-case";
import { ListProductsUseCase } from "src/product/application/uses-cases/list-products/list-products.use-case";
import { RemoveProductUseCase } from "src/product/application/uses-cases/remove-product/remove-product.use-case";
import { UpdateProductUseCase } from "src/product/application/uses-cases/update-product/update-product.use-case";
import { CreateProductInput } from "../dto/create-product.input";
import { ProductType } from "../dto/product.object-type";
import { UpdateProductInput } from "../dto/update-product.input";
import { PubSub } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSub,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly removeProductUseCase: RemoveProductUseCase,
        private readonly listProductsUseCase: ListProductsUseCase,
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
    ) { }

    @Mutation(() => ProductType)
    async createProduct(
        @Args('product') input: CreateProductInput,
    ): Promise<ProductType> {
        const productCreated = await this.createProductUseCase.execute(input);
        this.pubSub.publish('productAdded', { productAdded: productCreated });
        return productCreated;
    }

    @Mutation(() => ProductType)
    async updateProduct(
        @Args('product') input: UpdateProductInput,
    ): Promise<ProductType> {
        return await this.updateProductUseCase.execute(input);
    }

    @Mutation(() => Boolean)
    async removeProduct(
        @Args('id') input: string,
    ): Promise<Boolean> {
        await this.removeProductUseCase.execute(input);
        return true;
    }

    @Query(() => [ProductType])
    async products(): Promise<ProductType[]> {
        return this.listProductsUseCase.execute();
    }

    @Query(() => ProductType)
    async productById(
        @Args('id') id: string
    ): Promise<ProductType | null> {
        return this.getProductByIdUseCase.execute(id);
    }

    @Subscription(() => ProductType)
    productAdded() {
        return this.pubSub.asyncIterableIterator('productAdded');
    }
}