import Recipe from "../../models/Recipes";
import { iRecipeCreateBody } from "../../routes/Recipe/types";
import { Image } from "../File/Image";

export class RecipeCreate{
    async execute(body: iRecipeCreateBody, file: Express.Multer.File){
        const { userID, title, content, categories } = body;

        const image = new Image();
        
        const { path } = await image.optmize(file);

        await image.delete(file.path);
        
        const recipe = await Recipe.create({
            userID,
            title,        
            content,
            thumbnail_url: path,
            categories,
        })

        return { recipe, message: 'Receita criada com sucesso!'}
    }
}