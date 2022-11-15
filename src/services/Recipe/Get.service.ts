import Recipe from "../../models/Recipes";
import { iGlobalRecipeQuery, iRecipeGetParams } from "../../routes/Recipe/@types";

export class RecipeGet {
   async execute(params: iRecipeGetParams, query: iGlobalRecipeQuery) {
      const { userId } = params;
      const { limit, skip } = query;      

      const newQuery = userId ? { userID: userId } : undefined;

      const count = (await Recipe.find(newQuery as object)).length;

      const recipes = await Recipe.find(newQuery as object).skip(Number(skip)).limit(Number(limit));

      return { count: count, recipes: recipes };
   }
}
