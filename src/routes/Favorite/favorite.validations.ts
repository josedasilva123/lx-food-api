import { body, param } from "express-validator";

export const favoriteCreateValidation = () => {
   return [
      body("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),

      body("title").isString().withMessage("O título da receita (title) é obrigatório"),

      body("thumbnail_url").isString().withMessage("A url da thumbnail (thumbnail_url) é obrigatória"),
   ];
};

export const favoriteDeleteValidation = () => {
   return [      
      param("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),
   ];
};
