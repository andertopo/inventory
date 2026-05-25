import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateProductUseCase } from "src/product/application/uses-cases/create-product/create-user.use-case";
import { GetProductByIdUseCase } from "src/product/application/uses-cases/get-product/get-product-by-id.use-case";
import { ListProductsUseCase } from "src/product/application/uses-cases/list-products/list-products.use-case";
import { RemoveProductUseCase } from "src/product/application/uses-cases/remove-product/remove-product.use-case";
import { UpdateProductUseCase } from "src/product/application/uses-cases/update-product/update-product.use-case";
import { Product } from "src/product/domain/entities/product.entity";
import CreateProductDto from "./dto/create-product.dto";
import * as productByIdDto from "./dto/product-by-id.dto";
import { ProductListDto } from "./dto/product-list.dto";
import ProductDto from "./dto/product.dto";

@Controller()
export class ProductGrpcController {

  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) { }

  @GrpcMethod('ProductService', 'FindOne')
  async findOne(data: productByIdDto.ProductById): Promise<Product | null> {
    return await this.getProductByIdUseCase.execute(data.id);
  }

  @GrpcMethod('ProductService', 'List')
  async list(): Promise<ProductListDto> {
    const products = await this.listProductsUseCase.execute();
    return new ProductListDto(products.map(product => new ProductDto(
      product._id,
      product.name,
      product.description,
      product.price
    )));
  }

  @GrpcMethod('ProductService', 'Update')
  update(product: ProductDto): Promise<Product> {
    return this.updateProductUseCase.execute(product);
  }

  @GrpcMethod('ProductService', 'Create')
  create(product: CreateProductDto): Promise<Product> {
    return this.createProductUseCase.execute(product);
  }

  @GrpcMethod('ProductService', 'Remove')
  async remove(data: productByIdDto.ProductById): Promise<void> {
    await this.removeProductUseCase.execute(data.id);
  }
}
