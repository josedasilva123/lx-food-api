"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Create_service_1 = require("../../services/Recipe/Create.service");
const Delete_service_1 = require("../../services/Recipe/Delete.service");
const Edit_service_1 = require("../../services/Recipe/Edit.service");
const Get_service_1 = require("../../services/Recipe/Get.service");
const GetOneById_service_1 = require("../../services/Recipe/GetOneById.service");
class RecipeControllers {
    static Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                throw new Error("Arquivo enviado inválido.");
            }
            const recipeCreate = new Create_service_1.RecipeCreate();
            const response = yield recipeCreate.execute(req.body, req.file);
            res.status(200).json(response);
        });
    }
    static Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeDelete = new Delete_service_1.RecipeDelete();
            const response = yield recipeDelete.execute(req.params);
            res.status(200).json(response);
        });
    }
    static Edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeEdit = new Edit_service_1.RecipeEdit();
            const response = yield recipeEdit.execute(req.body, req.file);
            res.status(200).json(response);
        });
    }
    static Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeGet = new Get_service_1.RecipeGet();
            const response = yield recipeGet.execute(req.query);
            res.status(200).json(response);
        });
    }
    static GetOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeGetOneById = new GetOneById_service_1.RecipeGetOneById();
            const response = yield recipeGetOneById.execute(req.params);
            res.status(200).json(response);
        });
    }
}
exports.default = RecipeControllers;
