import { iAuthenticateBody } from "../../@types/types";

export interface iFavoriteCreateBody extends iAuthenticateBody{
    recipeId: string;
    title: string;
    thumbnail_url: string;
}

export interface iFavoriteDeleteParams{
    recipeId: string;
}