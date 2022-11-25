import Recipe from "../../models/Recipes";
import { iGlobalRecipeQuery } from "../../routes/Recipe/@types";

export class RecipeGet {
   async execute(query: iGlobalRecipeQuery) {
      const { userId, category, search, limit, skip } = query;

      let newQuery = {};

      if(category){
         newQuery = { ...newQuery, categories: [category] }
      }

      if(userId) {
         newQuery = { ...newQuery, userID: userId };
      }   

      if(search) {
         const searchRegex = new RegExp(search, "i");
         newQuery = { ...newQuery, title: { $regex: searchRegex } };
      }

      const count = (await Recipe.find(newQuery as object)).length;

      const recipes = await Recipe.find(newQuery as object)
         .skip(Number(skip))
         .limit(Number(limit));

      return { count: count, recipes: recipes };
   }
}
