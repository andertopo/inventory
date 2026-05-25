import ProductDto from "./product.dto";

export class ProductListDto {
    products: ProductDto[];

    constructor(products: ProductDto[]) {
        this.products = products;
    }
}