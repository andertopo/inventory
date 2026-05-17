import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductType {
    @Field(() => ID, { description: 'Products id' })
    _id: string = '';

    @Field({ description: 'Products name' })
    name: string = '';
    
    @Field({ description: 'Products price' })
    price: number = 0;
    
    @Field({ description: 'Products description' })
    description: string = '';
}