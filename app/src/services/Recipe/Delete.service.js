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
exports.RecipeDelete = void 0;
const mongodb_1 = require("mongodb");
const Recipes_1 = __importDefault(require("../../models/Recipes"));
const Delete_1 = require("../../utils/S3/Delete");
class RecipeDelete {
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recipeId } = params;
            const objectRecipeID = new mongodb_1.ObjectId(recipeId);
            const recipe = yield Recipes_1.default.findOne({ _id: objectRecipeID });
            if (!recipe) {
                throw new Error("A receita que você está tentando excluir não existe.");
            }
            const s3Delete = new Delete_1.S3Delete();
            s3Delete.execute(recipe.thumbnail_filename);
            yield Recipes_1.default.deleteOne({ _id: objectRecipeID });
            return { message: "Receita excluída com sucesso!" };
        });
    }
}
exports.RecipeDelete = RecipeDelete;
