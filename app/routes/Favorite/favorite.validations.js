"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteDeleteValidation = exports.favoriteCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const favoriteCreateValidation = () => {
    return [
        (0, express_validator_1.body)("id").isString().withMessage("O id do usuário é obrigatório"),
        (0, express_validator_1.body)("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),
        (0, express_validator_1.body)("title").isString().withMessage("O título da receita (title) é obrigatório"),
        (0, express_validator_1.body)("thumbnail_url").isString().withMessage("A url da thumbnail (thumbnail_url) é obrigatória"),
    ];
};
exports.favoriteCreateValidation = favoriteCreateValidation;
const favoriteDeleteValidation = () => {
    return [
        (0, express_validator_1.body)("id").isString().withMessage("O id do usuário é obrigatório"),
        (0, express_validator_1.param)("recipeId").isString().withMessage("O id da receita (recipeId) é obrigatório"),
    ];
};
exports.favoriteDeleteValidation = favoriteDeleteValidation;
