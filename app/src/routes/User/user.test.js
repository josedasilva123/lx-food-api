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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const User_1 = __importDefault(require("../../models/User"));
const server_1 = require("../../server");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/lxcook-user-test");
}));
describe("User Routes", () => {
    it("should register user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/")
            .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(200);
        expect(response.body.message).toBe("Cadastro realizado com sucesso!");
    }));
    it("should throw error when try to register and existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/")
            .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
    }));
    it("should throw error when missing body parameter in register", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(422);
        expect(response.body).toBeTruthy();
    }));
    it("should return user when login is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/login")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.user).toBeTruthy();
    }));
    it("should throw error when try to login with a unexisting user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/login")
            .send({
            email: "alecao@email.com.br",
            password: "@12Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("Desculpe, o usuário fornecido não existe.");
    }));
    it("should throw error when try to login with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/user/login")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos2",
        })
            .expect(400);
        expect(response.body.error).toBe("Desculpe, a senha fornecida está incorreta.");
    }));
    it("should autologin user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/user/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/user/autologin")
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.user).toBeTruthy();
    }));
    it("should throw error when token is invalid on autologin", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/user/autologin")
            .set("auth", "123")
            .expect(400);
        expect(response.body.error).toBe("Sua token expirou ou é inválida.");
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
