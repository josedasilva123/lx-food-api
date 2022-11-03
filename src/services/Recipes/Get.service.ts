import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iRecipeGetParams } from "../../routes/Recipes/types";

export class RecipeGet {
    async execute(params: iRecipeGetParams) {
      const { userId, limit, skip } = params;
  
      const query = userId ? { _id: new ObjectId(userId)} : {};

      const count = (await Recipe.find(query)).length;
  
      const recipes = await Recipe.find(query)
        .skip(Number(skip))
        .limit(Number(limit));
  
      return { count, recipes };
    }
  }