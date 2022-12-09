"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const favorite_controllers_1 = __importDefault(require("./favorite.controllers"));
const favorite_validations_1 = require("./favorite.validations");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.Authenticate, (0, favorite_validations_1.favoriteCreateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(favorite_controllers_1.default.Create));
router.delete("/:recipeId", authenticate_1.Authenticate, (0, favorite_validations_1.favoriteDeleteValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(favorite_controllers_1.default.Delete));
exports.default = router;
