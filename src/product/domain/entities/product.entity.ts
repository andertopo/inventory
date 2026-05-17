import { ApiProperty } from "@nestjs/swagger";

export class Product {
    _id: string = '';
    
    @ApiProperty({ example: 'notebook', description: 'Products name'})
    name: string = '';

    @ApiProperty({ example: 25000, description: 'product price'})
    price: number = 0;

    @ApiProperty({ example: 'traditional notebook', description: 'Products description'})
    description: string = '';
}