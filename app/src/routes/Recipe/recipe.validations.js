"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeSearchValidation = exports.recipeGetOneByIdValidation = exports.recipeGetByCategoryValidation = exports.recipeEditValidation = exports.recipeDeleteValidation = exports.recipeCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const recipeCreateValidation = () => {
    return [
        (0, express_validator_1.body)("userID").isString().withMessage("O ID de usuário (userID) é obrigatório"),
        (0, express_validator_1.body)("title").isString().withMessage("O título é (title) é obrigatório"),
        (0, express_validator_1.body)("content").isString().withMessage("O conteúdo é (content) é obrigatório"),
        (0, express_validator_1.body)("categories").isString().withMessage("A lista de categorias (categories) é obrigatória"),
    ];
};
exports.recipeCreateValidation = recipeCreateValidation;
const recipeDeleteValidation = () => {
    return [(0, express_validator_1.param)("recipeId").isString().withMessage("O ID da receita (recipeId) é obrigatório")];
};
exports.recipeDeleteValidation = recipeDeleteValidation;
const recipeEditValidation = () => {
    return [
        (0, express_validator_1.body)("_id").isString().withMessage("O ID da receita (_id) é obrigatório."),
        (0, express_validator_1.body)("userID").isString().withMessage("O ID de usuário (userID) é obrigatório"),
        (0, express_validator_1.body)("title").isString().withMessage("O título é (title) é obrigatório"),
        (0, express_validator_1.body)("content").isString().withMessage("O conteúdo é (content) é obrigatório"),
        (0, express_validator_1.body)("categories").isArray().withMessage("A lista de categorias (categories) é obrigatória"),
    ];
};
exports.recipeEditValidation = recipeEditValidation;
const recipeGetByCategoryValidation = () => {
    return [(0, express_validator_1.param)("category").isString().withMessage("A lista categoria (category) é obrigatória")];
};
exports.recipeGetByCategoryValidation = recipeGetByCategoryValidation;
const recipeGetOneByIdValidation = () => {
    return [(0, express_validator_1.query)("_id").isString().withMessage("O ID da técnologia é essencial para realizar a edição")];
};
exports.recipeGetOneByIdValidation = recipeGetOneByIdValidation;
const recipeSearchValidation = () => {
    return [(0, express_validator_1.param)("search").isString().withMessage("A busca (search) é obrigatório.")];
};
exports.recipeSearchValidation = recipeSearchValidation;
