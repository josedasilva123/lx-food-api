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
exports.UserRegister = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRegister {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = body;
            const existingUser = yield User_1.default.findOne({ email: email });
            if (existingUser) {
                throw new Error("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
            }
            const encryptedPassword = bcryptjs_1.default.hashSync(password, 1);
            const user = {
                name,
                email,
                password: encryptedPassword,
            };
            yield User_1.default.create(user);
            return { message: "Cadastro realizado com sucesso!" };
        });
    }
}
exports.UserRegister = UserRegister;
