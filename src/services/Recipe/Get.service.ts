import Recipe from "../../models/Recipes";
import { iGlobalRecipeQuery, iRecipeGetParams } from "../../routes/Recipe/@types";

export class RecipeGet {
   async execute(params: iRecipeGetParams, query: iGlobalRecipeQuery) {
      const { userId } = params;
      const { category, search, limit, skip } = query;

      const newQuery = () => {
         const categoryQuery = category ? { categories: [category] } : {};

         if (userId) {
            return { ...categoryQuery, userID: userId };
         } else if (search) {
            const searchRegex = new RegExp(search, "i");
            return { ...categoryQuery, title: { $regex: searchRegex } };
         } else if (category) {
            return categoryQuery;
         } else {
            return undefined;
         }
      };

      const count = (await Recipe.find(newQuery as object)).length;

      const recipes = await Recipe.find(newQuery as object)
         .skip(Number(skip))
         .limit(Number(limit));

      return { count: count, recipes: recipes };
   }
}
