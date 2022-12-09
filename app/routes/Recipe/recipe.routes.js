"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const multer_1 = require("../../middlewares/multer");
const recipe_controllers_1 = __importDefault(require("./recipe.controllers"));
const recipe_validations_1 = require("./recipe.validations");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.Authenticate, multer_1.MulterSingleUpload, (0, recipe_validations_1.recipeCreateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(recipe_controllers_1.default.Create));
router.patch("/", authenticate_1.Authenticate, multer_1.MulterSingleUpload, recipe_validations_1.recipeEditValidation, handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(recipe_controllers_1.default.Edit));
router.delete("/:recipeId", authenticate_1.Authenticate, (0, recipe_validations_1.recipeDeleteValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(recipe_controllers_1.default.Delete));
router.get("/", (0, handleErrors_1.HandleErrors)(recipe_controllers_1.default.Get));
router.get("/:_id", (0, handleErrors_1.HandleErrors)(recipe_controllers_1.default.GetOneById));
exports.default = router;
