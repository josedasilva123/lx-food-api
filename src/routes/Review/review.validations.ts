import { body, param, query } from "express-validator";

/*
    recipeId: string;
    content: string;
    score: number;
*/

export const reviewCreateValidation = () => {
   return [
      body("recipeId").isString().withMessage("O ID da receita (recipeId) é obrigatório"),

      body("content").isString().withMessage("O conteúdo é (content) é obrigatório"),

      body("score").isNumeric().withMessage("A nota (score) é obrigatória"),
   ];
};

export const reviewDeleteValidation = () => {
   return [
      param("recipeId").isString().withMessage("O parâmetro recipeId é obrigatório"),

      param("reviewId").isString().withMessage("O parâmetro reviewId é obrigatório"),
   ];
};

export const reviewEditValidation = () => {
    return [
       param("recipeId").isString().withMessage("O parâmetro recipeId é obrigatório"),
 
       param("reviewId").isString().withMessage("O parâmetro reviewId é obrigatório"),
    
       body("content").isString().withMessage("O conteúdo é (content) é obrigatório"),

       body("score").isNumeric().withMessage("A nota (score) é obrigatória"),
    ];
 };
 
