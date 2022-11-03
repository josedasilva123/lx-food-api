import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { Image } from "../File/Image";

interface iRecipeDeleteParams {
  recipeId: string;
}

export class RecipeDelete {
  async execute(params: iRecipeDeleteParams) {
    const { recipeId } = params;
    
    const objectRecipeID = new ObjectId(recipeId);

    const recipe = await Recipe.findOne({ _id: objectRecipeID });

    if (!recipe) {
      throw new Error("A receita que você está tentando excluir não existe.");
    }

    const deletePath = recipe.thumbnail_url.replace(
      process.env.BASE_URL as string,
      ""
    );

    const image = new Image();

    image.delete(deletePath);

    await Recipe.deleteOne({ _id: objectRecipeID });
  }
}