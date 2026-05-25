import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/rest/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDocument, ProductSchema } from './infrastructure/persistence/mongoose/product.schema';
import { ProductResolver } from './infrastructure/graphql/resolvers/product.resolver';
import { CreateProductUseCase } from './application/uses-cases/create-product/create-user.use-case';
import { ProductRepositoryImpl } from './infrastructure/persistence/product.repository.impl';
import { UpdateProductUseCase } from './application/uses-cases/update-product/update-product.use-case';
import { RemoveProductUseCase } from './application/uses-cases/remove-product/remove-product.use-case';
import { ListProductsUseCase } from './application/uses-cases/list-products/list-products.use-case';
import { GetProductByIdUseCase } from './application/uses-cases/get-product/get-product-by-id.use-case';
import { PubSub } from 'graphql-subscriptions';
import { ProductGrpcController } from './infrastructure/grpc/product.grpc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema, collection: 'products' }])
  ],
  controllers: [ProductController, ProductGrpcController],
  providers: [
    ProductResolver,
    CreateProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    ListProductsUseCase,
    GetProductByIdUseCase,
    {
        provide: 'IProductRepository',
        useClass: ProductRepositoryImpl
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(), // Proveedor global para emitir eventos
    },
  ],
  exports: [
    CreateProductUseCase
  ]
})
export class ProductModule {}