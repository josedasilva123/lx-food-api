import Recipe from "../../models/Recipes";
import { iRecipeGetByCategoryParams } from "../../routes/Recipes/types";

export class RecipeGetByCategory {
  async execute(params: iRecipeGetByCategoryParams) {
    const { category, limit, skip } = params;

    const count = await Recipe.count({ categories: [category] });

    const recipes = await Recipe.find({ categories: [category] })
      .skip(Number(skip))
      .limit(Number(limit));

    return { count, recipes };
  }
}
