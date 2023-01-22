import { Info } from "multer-sharp-s3/dist/types/main";
import Recipe from "../../models/Recipes";
import { iRecipeCreateBody } from "../../routes/Recipe/@types";

export class RecipeCreate {
   async execute(body: iRecipeCreateBody, file: Info) {
      const { userId, title, content, categories } = body;
      
      const recipe = await Recipe.create({
         userId,
         title,
         content,
         thumbnail_filename: file.Key,
         thumbnail_url: file.Location,
         categories: JSON.parse(categories),
      });

      return { recipe, message: "Receita criada com sucesso!" };
   }
}
