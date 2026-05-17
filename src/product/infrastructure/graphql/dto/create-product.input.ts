import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
    @Field({ description: 'Products name' })
    name: string = '';

    @Field({ description: 'Products price' })
    price: number = 0;

    @Field({ description: 'Products description' })
    description: string = '';
}