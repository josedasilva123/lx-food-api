import Recipe from "../../models/Recipes";
import { iGlobalQueryParams } from "../../routes/Recipes/types";

interface iRecipeGetByCategoryParams extends iGlobalQueryParams {
  category: string;
}

export class RecipeGetByCategory {
  async execute(params: iRecipeGetByCategoryParams) {
    const { category, limit, skip } = params;

    const count = (await Recipe.find({ categories: [category] })).length;

    const recipes = await Recipe.find({ categories: [category] })
      .skip(Number(skip))
      .limit(Number(limit));

    return { count, recipes };
  }
}
