import { iAuthenticateBody } from "../../@types/types";

export interface iReviewCreateBody extends iAuthenticateBody{
    recipeId: string;
    content: string;
    score: number;
}

export interface iReviewDeleteParams{
    recipeId?: string;
    reviewId?: string;
}

export interface iReviewEditBody extends iAuthenticateBody{
    content: string;
    score: number;
}

export interface iReviewEditParams{
    recipeId?: string;
    reviewId?: string;
}