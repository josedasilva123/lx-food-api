import { ObjectId } from "mongodb";
import { Info } from "multer-sharp-s3/dist/types/main";
import Recipe, { iRecipe } from "../../models/Recipes";
import { iRecipeEditBody, iRecipeEditParams } from "../../routes/Recipe/@types";

export class RecipeEdit {
   async execute(body: iRecipeEditBody, params: iRecipeEditParams, file?: Info) {
      const { id, title, content, categories } = body;
      const { recipeId } = params;

      const objectRecipeId = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: objectRecipeId });

      if (!recipe) {
         throw new Error("Desculpe, receita não encontrada.");
      }

      if (id !== recipe.userId) {
         throw new Error("Somente o propretário da receita pode edita-la.");
      }

      await Recipe.updateOne(
         {
            _id: objectRecipeId,
         },
         {
            $set: {
               title,
               content,
               thumbnail_filename: file?.Key,
               thumbnail_url: file?.Location,
               categories: JSON.parse(categories),
            },
         }
      );

      return { message: "Receita atualizada com sucesso!" };
   }
}
