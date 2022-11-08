import Recipe from "../../models/Recipes";
import { iGlobalRecipeQuery, iRecipeGetByCategoryParams } from "../../routes/Recipe/types";

export class RecipeGetByCategory {
   async execute(params: iRecipeGetByCategoryParams, query: iGlobalRecipeQuery) {
      const { category } = params;
      const { limit, skip } = query;

      const count = await Recipe.count({ categories: [category] });

      const recipes = await Recipe.find({ categories: [category] })
         .skip(Number(skip))
         .limit(Number(limit));

      return { count, recipes };
   }
}
