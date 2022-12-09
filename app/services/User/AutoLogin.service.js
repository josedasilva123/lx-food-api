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
exports.UserAutoLogin = void 0;
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../../models/User"));
class UserAutoLogin {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = body;
            const userID = new mongodb_1.ObjectId(id);
            const user = (yield User_1.default.findOne({ _id: userID }));
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    favoriteRecipes: user.favoriteRecipes,
                },
            };
        });
    }
}
exports.UserAutoLogin = UserAutoLogin;
