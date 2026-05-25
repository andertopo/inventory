export default class ProductDto {
    _id: string;
    name: string;
    description: string;
    price: number;

    constructor(_id: string, name: string, description: string, price: number) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}