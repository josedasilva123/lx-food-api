import Category from "../../models/Category";

export class CategoryGet{
    async execute(){
        const categories = await Category.find();

        return { categories };
    }
}