"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const user_controllers_1 = __importDefault(require("./user.controllers"));
const user_validations_1 = require("./user.validations");
const router = (0, express_1.Router)();
router.post("/", (0, user_validations_1.userRegisterValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(user_controllers_1.default.Register));
router.post("/login", (0, user_validations_1.userLoginValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(user_controllers_1.default.Login));
router.get("/autologin", authenticate_1.Authenticate, (0, handleErrors_1.HandleErrors)(user_controllers_1.default.AutoLogin));
exports.default = router;
