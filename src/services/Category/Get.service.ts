import Category from "../../models/Category";

export class GetCategory{
    async execute(){
        const categories = await Category.find();

        return { categories };
    }
}