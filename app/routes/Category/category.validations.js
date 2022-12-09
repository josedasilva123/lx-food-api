"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDeleteValidation = exports.categoryCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const categoryCreateValidation = () => {
    return [
        (0, express_validator_1.body)("slug").isString().withMessage("O slug é obrigatório."),
        (0, express_validator_1.body)("name").isString().withMessage("O nome (name) é obrigatório"),
    ];
};
exports.categoryCreateValidation = categoryCreateValidation;
const categoryDeleteValidation = () => {
    return [
        (0, express_validator_1.param)("categoryId").isString().withMessage("O id de categoria (categoryId) é obrigatório.")
    ];
};
exports.categoryDeleteValidation = categoryDeleteValidation;
