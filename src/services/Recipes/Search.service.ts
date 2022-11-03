import Recipe from "../../models/Recipes";
import { iGlobalQueryParams } from "../../routes/Recipes/types";

export class RecipeSearch {
  async execute(search: string, query: iGlobalQueryParams) {
    const { skip, limit } = query;
    const searchRegex = new RegExp(search);

    const count = await Recipe.count({ title: { $regex: searchRegex } });

    const recipes = await Recipe.find({ title: { $regex: searchRegex } })
      .skip(Number(skip))
      .limit(Number(limit));
    
    return { count, recipes };  
  }
}
