import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, collection: 'product' })
export class ProductDocument extends Document {
    @Prop()
    name: string = '';

    @Prop()
    price: number = 0;

    @Prop()
    description: string = '';
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);