import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iRecipeGetByOneParams } from "../../routes/Recipe/@types";

export class RecipeGetOneById {
   async execute(params: iRecipeGetByOneParams) {
      const { _id } = params;

      const objectID = new ObjectId(_id);

      const recipe = await Recipe.findOne({ _id: objectID });

      return { recipe };
   }
}
