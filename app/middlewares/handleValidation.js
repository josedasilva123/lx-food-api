"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const express_validator_1 = require("express-validator");
const Validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.Validate = Validate;
