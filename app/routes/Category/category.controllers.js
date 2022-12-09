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
const Create_service_1 = require("../../services/Category/Create.service");
const Delete_service_1 = require("../../services/Category/Delete.service");
const Get_service_1 = require("../../services/Category/Get.service");
class CategoryControllers {
    static Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryCreate = new Create_service_1.CategoryCreate();
            const response = yield categoryCreate.execute(req.body);
            res.status(200).json(response);
        });
    }
    static Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryDelete = new Delete_service_1.CategoryDelete();
            const response = yield categoryDelete.execute(req.params);
            res.status(200).json(response);
        });
    }
    static Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryGet = new Get_service_1.CategoryGet();
            const response = yield categoryGet.execute();
            res.status(200).json(response);
        });
    }
}
exports.default = CategoryControllers;
