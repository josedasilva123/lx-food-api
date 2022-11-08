import { body, param, query } from "express-validator";


export const recipeCreateValidation = () => {
  return [
    body("userID")
      .isString()
      .withMessage("O ID de usuário (userID) é obrigatório"),

    body("title").isString().withMessage("O título é (title) é obrigatório"),

    body("content")
      .isString()
      .withMessage("O conteúdo é (content) é obrigatório"),  
       
    body("categories")
      .isString()
      .withMessage("A lista de categorias (categories) é obrigatória"),  
  ];
};


export const recipeDeleteValidation = () => {
  return [
    param("recipeId")
      .isString()
      .withMessage("O ID da receita (recipeId) é obrigatório"),
  ];
};


export const recipeEditValidation = () => {
  return [
    body("_id")
      .isString()
      .withMessage("O ID da receita (_id) é obrigatório."),

    body("userID")
      .isString()
      .withMessage("O ID de usuário (userID) é obrigatório"),

    body("title").isString().withMessage("O título é (title) é obrigatório"),

    body("content")
      .isString()
      .withMessage("O conteúdo é (content) é obrigatório"),

    body("categories")
      .isArray()
      .withMessage("A lista de categorias (categories) é obrigatória"),
  ];
};


export const recipeGetByCategoryValidation = () => {
  return [
    param("category")
      .isString()
      .withMessage("A lista categoria (category) é obrigatória"),
  ];
};

export const recipeGetOneByIdValidation = () => {
  return [
    query("_id")
      .isString()
      .withMessage("O ID da técnologia é essencial para realizar a edição"),
  ];
};

export const recipeSearchValidation = () => {
  return [
    param("search")
      .isString()
      .withMessage("A busca (search) é obrigatório."),
  ];
};