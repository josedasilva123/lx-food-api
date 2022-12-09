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
exports.RecipeCreate = void 0;
const Recipes_1 = __importDefault(require("../../models/Recipes"));
class RecipeCreate {
    execute(body, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, title, content, categories } = body;
            const recipe = yield Recipes_1.default.create({
                userID,
                title,
                content,
                thumbnail_filename: file.Key,
                thumbnail_url: file.Location,
                categories: JSON.parse(categories),
            });
            return { recipe, message: "Receita criada com sucesso!" };
        });
    }
}
exports.RecipeCreate = RecipeCreate;
