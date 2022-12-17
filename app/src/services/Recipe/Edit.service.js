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
exports.RecipeEdit = void 0;
const mongodb_1 = require("mongodb");
const Recipes_1 = __importDefault(require("../../models/Recipes"));
class RecipeEdit {
    execute(body, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, userID, title, content, categories } = body;
            const objectID = new mongodb_1.ObjectId(_id);
            const recipe = (yield Recipes_1.default.findOne({ _id: objectID }));
            if (!recipe) {
                throw new Error("Desculpe, receita não encontrada.");
            }
            if (userID !== String(recipe._id)) {
                throw new Error("Somente o propretário da receita pode edita-la.");
            }
            yield Recipes_1.default.updateOne({
                _id,
            }, {
                $set: {
                    title,
                    content,
                    thumbnail_filename: file === null || file === void 0 ? void 0 : file.Key,
                    thumbnail_url: file === null || file === void 0 ? void 0 : file.Location,
                    categories: JSON.parse(categories),
                },
            });
            return { message: "Receita atualizada com sucesso!" };
        });
    }
}
exports.RecipeEdit = RecipeEdit;
