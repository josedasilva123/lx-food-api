import { ObjectId } from "mongodb";
import Category from "../../models/Category";
import { iCategoryDeleteParams } from "../../routes/Category/@types";

export class CategoryDelete{
    async execute(params: iCategoryDeleteParams){
        const { categoryId } = params;

        const objectCategoryID = new ObjectId(categoryId);

        const category = Category.findOne({ _id: objectCategoryID })

        if(!category){
            throw new Error('A categoria que você está tentando excluir não existe.')
        }

        await Category.deleteOne({ _id: objectCategoryID });

        return { message: 'Categoria excluida com sucesso!'}
    }
}