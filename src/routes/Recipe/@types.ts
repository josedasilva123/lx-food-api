import { iAuthenticateBody } from "../../@types/types";

export interface iRecipeCreateBody {
   userId: string;
   title: string;
   content: string;
   categories: string;
}

export interface iRecipeDeleteParams {
   recipeId?: string;
}

export interface iRecipeEditBody {
   userId: string;
   title: string;
   content: string;
   categories: string;
}

export interface iRecipeEditParams {
   recipeId?: string;
}

export interface iGlobalRecipeQuery {
   userId?: string;
   category?: string;
   search?: string;
   limit?: string;
   skip?: string;
}

export interface iRecipeGetByOneParams {
   _id?: string;
}