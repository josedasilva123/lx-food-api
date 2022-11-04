import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iGlobalRecipeQuery, iRecipeGetParams } from "../../routes/Recipe/types";

export class RecipeGet {
    async execute(params: iRecipeGetParams, query: iGlobalRecipeQuery) {
      const { userId,  } = params;
      const { limit, skip } = query;
  
      const newQuery = userId ? { _id: new ObjectId(userId)} : {};

      const count = (await Recipe.find(newQuery)).length;
  
      const recipes = await Recipe.find(newQuery)
        .skip(Number(skip))
        .limit(Number(limit));
  
      return { count, recipes };
    }
  }