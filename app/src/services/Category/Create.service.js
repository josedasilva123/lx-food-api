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
exports.CategoryCreate = void 0;
const Category_1 = __importDefault(require("../../models/Category"));
class CategoryCreate {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug, name } = body;
            const filteredSlug = slug.toLowerCase().replace(' ', '');
            const existingCategory = yield Category_1.default.findOne({ slug: filteredSlug });
            if (existingCategory) {
                throw new Error("Já existe uma categoria com o respectivo slug.");
            }
            const category = yield Category_1.default.create({ slug, name });
            return { category, message: "Categoria criada com sucesso." };
        });
    }
}
exports.CategoryCreate = CategoryCreate;
