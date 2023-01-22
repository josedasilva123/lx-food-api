import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iRecipeDeleteParams } from "../../routes/Recipe/@types";
import { S3Delete } from "../../utils/S3/Delete";

export class RecipeDelete {
   async execute(params: iRecipeDeleteParams) {
      const { recipeId } = params;

      const objectRecipeId = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: objectRecipeId });

      if (!recipe) {
         throw new Error("A receita que você está tentando excluir não existe.");
      }

      const s3Delete = new S3Delete();
      
      s3Delete.execute(recipe.thumbnail_filename);

      await Recipe.deleteOne({ _id: objectRecipeId });

      return { message: "Receita excluída com sucesso!" };
   }
}
