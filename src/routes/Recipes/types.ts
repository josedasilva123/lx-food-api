export interface iRecipeCreateBody{
    userID: string;
    title: string;
    content: string;
    categories: string[];
}

export interface iRecipeDeleteParams {
  recipeId: string;
}

export interface iRecipeEditBody {
  _id: string;
  title: string;
  content: string;
  categories: string[];
}

export interface iGlobalQueryParams {
  limit: string;
  skip: string;
}

export interface iRecipeGetQueryParams {
  _id?: string;
}

export interface iRecipeGetByCategoryParams extends iGlobalQueryParams {
  category: string;
}

export interface iRecipeGetParams extends iGlobalQueryParams {
  userId?: string;
}
