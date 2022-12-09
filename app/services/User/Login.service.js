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
exports.UserLogin = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserLogin {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const user = yield User_1.default.findOne({ email: email });
            if (!user) {
                throw new Error("Desculpe, o usuário fornecido não existe.");
            }
            if (!bcryptjs_1.default.compareSync(password, user.password)) {
                throw new Error("Desculpe, a senha fornecida está incorreta.");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
            }, process.env.JWT_SECRETKEY, { expiresIn: "12h" });
            return {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    favoriteRecipes: user.favoriteRecipes,
                },
                token: token,
            };
        });
    }
}
exports.UserLogin = UserLogin;
