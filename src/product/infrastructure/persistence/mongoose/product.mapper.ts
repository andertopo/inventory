import { Product } from "src/product/domain/entities/product.entity";
import { ProductDocument } from "./product.schema";

export class ProductMapper {
    static toDomain(productDocument: ProductDocument): Product {
        const product = new Product();
        product._id = productDocument._id.toString();
        product.name = productDocument.name;
        product.price = productDocument.price;
        product.description = productDocument.description;
        return product;
    }
}