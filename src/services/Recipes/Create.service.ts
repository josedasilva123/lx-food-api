import Recipe from "../../models/Recipes";
import { iRecipeCreateBody } from "../../routes/Recipes/types";
import { Image } from "../File/Image";

export class RecipeCreate{
    async execute(body: iRecipeCreateBody, file: Express.Multer.File){
        const { userID, title, content, categories } = body;

        if(!file) {
            throw new Error("Arquivo enviando inválido."); 
        }

        const image = new Image();
        
        const { path } = await image.optmize(file);

        await image.delete(file.path);
        
        await Recipe.create({
            userID,
            title,        
            content,
            thumbnail_url: path,
            categories,
        })

        return { message: 'Receita criada com sucesso!'}
    }
}