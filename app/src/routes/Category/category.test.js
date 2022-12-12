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
const Category_1 = __importDefault(require("../../models/Category"));
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
describe("Category Routes", () => {
    it("should create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .set("auth", token)
            .send({
            slug: "example-category",
            name: "Example Category",
        })
            .expect(200);
        expect(response.body.message).toBe("Categoria criada com sucesso.");
        expect(response.body.category).toBeTruthy();
    }));
    it("should throw error when try to create a new category with a existing slug", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .set("auth", token)
            .send({
            slug: "example-category",
            name: "Example Category",
        })
            .expect(400);
        expect(response.body.error).toBe("Já existe uma categoria com o respectivo slug.");
    }));
    it("should throw error when try to create a category with a missing body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .set("auth", token)
            .send({
            name: "Example Category",
        })
            .expect(422);
    }));
    it("should throw error when try to create a category with authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .send({
            slug: "example-category",
            name: "Example Category",
        })
            .expect(400);
        expect(response.body.error).toBe("Está rota precisa de autorização.");
    }));
    it("should delete a existing category", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const createResponse = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/category/")
            .set("auth", token)
            .send({
            slug: "example-category2",
            name: "Example Category",
        })
            .expect(200);
        const deleteResponse = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/category/${createResponse.body.category._id}/`)
            .set("auth", token)
            .expect(200);
        expect(deleteResponse.body.message).toBe("Categoria excluida com sucesso!");
    }));
    it("should throw error when try to delete unexisting category", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getMockUserToken(mockUser.email, mockUser.password);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete("/category/6368fd43446e687ef9172111/")
            .set("auth", token)
            .expect(400);
        expect(response.body.error).toBe("A categoria que você está tentando excluir não existe.");
    }));
    it("should throw error when try do delete a category without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete("/category/6368fd43446e687ef9172111/")
            .expect(400);
        expect(response.body.error).toBe("Está rota precisa de autorização.");
    }));
    it("should get categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/category")
            .expect(200);
        expect(response.body.categories).toBeTruthy();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany();
    yield Category_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
