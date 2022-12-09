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
const mockUser = {
    name: "Josefino Silva",
    email: "josefino@email.com.br",
    password: "@12Patinhos",
};
const getMockUserToken = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server_1.serverHttp).post("/user/login").send({
        email,
        password,
    });
    return response.body.token;
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/lxcook-test");
    yield (0, supertest_1.default)(server_1.serverHttp).post("/user").send(mockUser);
}));
describe("Favorite Routes", () => {
    it("should create a new favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/favorite/")
            .set("auth", token)
            .send({
            recipeId: "637e1f5d9e648375aeed83f2",
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
        })
            .expect(200);
        expect(response.body.message).toBe("Favorito adicionado com sucesso!");
    }));
    it("should throw error when try to create a new favorite with the same id of another", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/favorite/")
            .set("auth", token)
            .send({
            recipeId: "637e1f5d9e648375aeed83f2",
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
        })
            .expect(400);
        expect(response.body.error).toBe("Está receita já está na lista de favoritos.");
    }));
    it("should throw error when try to create a favorite with a missing body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .set("auth", token)
            .send({
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
        })
            .expect(422);
    }));
    it("should throw error when try to delete unexisting favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp).delete("/favorite/6368fd43446e687ef9172111/").set("auth", token).expect(400);
        expect(response.body.error).toBe("Está receita não está na lista de favoritos ou é inválida.");
    }));
    it("should delete a existing favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const deleteResponse = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/favorite/637e1f5d9e648375aeed83f2/`)
            .set("auth", token)
            .expect(200);
        expect(deleteResponse.body.message).toBe("Favorito removido com sucesso!");
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
