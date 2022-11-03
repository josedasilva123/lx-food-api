import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iGlobalQueryParams } from "../../routes/Recipes/types";

interface iRecipeGetParams extends iGlobalQueryParams{
    userId?: string;
}

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