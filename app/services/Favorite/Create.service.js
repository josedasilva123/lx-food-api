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
exports.FavoriteCreate = void 0;
const mongodb_1 = require("mongodb");
const Recipes_1 = __importDefault(require("../../models/Recipes"));
const User_1 = __importDefault(require("../../models/User"));
class FavoriteCreate {
    execute(body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id, recipeId, title, thumbnail_url } = body;
            const newObjectUserID = new mongodb_1.ObjectId(id);
            const user = yield User_1.default.findOne({ _id: newObjectUserID });
            if ((_a = user.favoriteRecipes) === null || _a === void 0 ? void 0 : _a.some(recipe => recipe.id === recipeId)) {
                throw new Error("Está receita já está na lista de favoritos.");
            }
            const newObjectRecipeID = new mongodb_1.ObjectId(recipeId);
            const recipe = yield Recipes_1.default.findOne({ _id: newObjectRecipeID });
            if (!recipe) {
                throw new Error("A receita que você está tentando adicionar não existe.");
            }
            const newFavoriteRecipe = { id: recipeId, title, thumbnail_url };
            const newFavoriteRecipeList = [...(user.favoriteRecipes ? user.favoriteRecipes : []), newFavoriteRecipe];
            yield User_1.default.updateOne({
                _id: newObjectUserID
            }, {
                $set: {
                    favoriteRecipes: newFavoriteRecipeList
                }
            });
            return { message: 'Favorito adicionado com sucesso!' };
        });
    }
}
exports.FavoriteCreate = FavoriteCreate;
