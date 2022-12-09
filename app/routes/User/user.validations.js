"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterValidation = exports.userLoginValidation = void 0;
const express_validator_1 = require("express-validator");
const userLoginValidation = () => {
    return [
        (0, express_validator_1.body)("email").isString().withMessage("O e-mail (email) é obrigatório"),
        (0, express_validator_1.body)("password").isString().withMessage("A senha (password) é obrigatória"),
    ];
};
exports.userLoginValidation = userLoginValidation;
const userRegisterValidation = () => {
    return [
        (0, express_validator_1.body)("name").isString().withMessage("O nome (name) é obrigatório"),
        (0, express_validator_1.body)("email").isString().withMessage("O e-mail (email) é obrigatório").isEmail().withMessage("É necessário um e-mail válido"),
        (0, express_validator_1.body)("password").isString().withMessage("A senha (password) é obrigatória"),
    ];
};
exports.userRegisterValidation = userRegisterValidation;
