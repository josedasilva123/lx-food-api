import { Info } from "multer-sharp-s3/dist/types/main";
import Recipe from "../../models/Recipes";
import { iRecipeCreateBody } from "../../routes/Recipe/@types";
import { Image } from "../File/Image.service";

export class RecipeCreate {
   async execute(body: iRecipeCreateBody, file: Info) {
      const { userID, title, content, categories } = body;
      
      const recipe = await Recipe.create({
         userID,
         title,
         content,
         thumbnail_url: file.Location,
         categories: JSON.parse(categories),
      });

      return { file, message: "Receita criada com sucesso!" };
   }
}
