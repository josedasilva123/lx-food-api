import { body, param } from "express-validator";

export const favoriteCreateValidation = () => {
   return [
      body("id").isString().withMessage("O id do usuário é obrigatório"),

      body("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),

      body("title").isString().withMessage("O título da receita (title) é obrigatório"),

      body("thumbnail_url").isString().withMessage("A url da thumbnail (thumbnail_url) é obrigatória"),
   ];
};

export const userRegisterValidation = () => {
   return [
      body("id").isString().withMessage("O id do usuário é obrigatório"),
      
      param("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),
   ];
};
