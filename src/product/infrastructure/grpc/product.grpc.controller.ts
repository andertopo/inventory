import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Product } from "src/product/domain/entities/product.entity";
import ProductById from "./dto/product-by-id.dto";

@Controller()
export class ProductGrpcController {

  @GrpcMethod('ProductService', 'FindOne')
  findOne(data: ProductById): Product | undefined {
    const items = [
      { _id: "1", name: 'Product 1', price: 10, description: 'Description 1' },
      { _id: "2", name: 'Product 2', price: 20, description: 'Description 2' },
    ] as Product[];
    return items.find(({ _id }) => _id === data.id.toString());
  }
}
