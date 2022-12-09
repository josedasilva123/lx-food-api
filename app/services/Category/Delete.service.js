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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDelete = void 0;
const mongodb_1 = require("mongodb");
const Category_1 = __importDefault(require("../../models/Category"));
class CategoryDelete {
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = params;
            const objectCategoryID = new mongodb_1.ObjectId(categoryId);
            const category = yield Category_1.default.findOne({ _id: objectCategoryID });
            if (!category) {
                throw new Error('A categoria que você está tentando excluir não existe.');
            }
            yield Category_1.default.deleteOne({ _id: objectCategoryID });
            return { message: 'Categoria excluida com sucesso!' };
        });
    }
}
exports.CategoryDelete = CategoryDelete;
