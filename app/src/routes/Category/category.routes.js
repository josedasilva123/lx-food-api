"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const category_controllers_1 = __importDefault(require("./category.controllers"));
const category_validations_1 = require("./category.validations");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.Authenticate, (0, category_validations_1.categoryCreateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(category_controllers_1.default.Create));
router.delete("/:categoryId", authenticate_1.Authenticate, (0, category_validations_1.categoryDeleteValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(category_controllers_1.default.Delete));
router.get("/", (0, handleErrors_1.HandleErrors)(category_controllers_1.default.Get));
exports.default = router;
