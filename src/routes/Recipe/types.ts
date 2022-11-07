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
  userID: string;
  title: string;
  content: string;
  categories: string[];
}

export interface iGlobalRecipeQuery {
  limit?: string;
  skip?: string;
}

export interface iRecipeGetParams {
  userId?: string;
}

export interface iRecipeGetByOne {
  _id?: string;
}

export interface iRecipeGetByCategoryParams  {
  category?: string;
}

export interface iRecipeSearchParams{
  search?: string;
}
