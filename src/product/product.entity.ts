import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    @ApiProperty({ example: 'notebook', description: 'Products name'})
    name: string = '';

    @Prop()
    @ApiProperty({ example: 25000, description: 'product price'})
    price: number = 0;

    @Prop()
    @ApiProperty({ example: 'traditional notebook', description: 'Products description'})
    description: string = '';
}

export const ProductSchema = SchemaFactory.createForClass(Product);