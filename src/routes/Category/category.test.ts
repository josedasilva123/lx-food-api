import mongoose from "mongoose";
import request from "supertest";
import Category from "../../models/Category";
import User from "../../models/User";
import { serverHttp } from "../../server";

const mockUser = {
   name: "Josefino Silva",
   email: "josefino@email.com.br",
   password: "@12Patinhos",
};

const getMockUserToken = async (email: string, password: string) => {
   const response = await request(serverHttp).post("/user/login").send({
      email,
      password,
   });

   return response.body.token;
};

beforeAll(async () => {
   await mongoose.connect("mongodb://localhost:27017/lxcook-test");
   await request(serverHttp).post("/user").send(mockUser);
});

describe("Category Routes", () => {
   it("should create a new category", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp)
         .post("/category/")
         .set("auth", token)
         .send({
            slug: "example-category",
            name: "Example Category",
         })
         .expect(200);

      expect(response.body.message).toBe("Categoria criada com sucesso.");
      expect(response.body.category).toBeTruthy();
   });

   it("should throw error when try to create a new category with a existing slug", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp)
         .post("/category/")
         .set("auth", token)
         .send({
            slug: "example-category",
            name: "Example Category",
         })
         .expect(400);

      expect(response.body.error).toBe("Já existe uma categoria com o respectivo slug.");
   });

   it("should throw error when try to create a category with a missing body parameter", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      await request(serverHttp)
         .post("/category/")
         .set("auth", token)
         .send({
            name: "Example Category",
         })
         .expect(422);
   });

   it("should throw error when try to create a category with authorization", async () => {
      const response = await request(serverHttp)
         .post("/category/")
         .send({
            slug: "example-category",
            name: "Example Category",
         })
         .expect(400);

      expect(response.body.error).toBe("Está rota precisa de autorização.");
   });

   it("should delete a existing category", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const createResponse = await request(serverHttp)
         .post("/category/")
         .set("auth", token)
         .send({
            slug: "example-category2",
            name: "Example Category",
         })
         .expect(200);

      const deleteResponse = await request(serverHttp)
         .delete(`/category/${createResponse.body.category._id}/`)
         .set("auth", token)
         .expect(200);

      expect(deleteResponse.body.message).toBe("Categoria excluida com sucesso!");
   });

   it("should throw error when try to delete unexisting category", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp)
        .delete("/category/6368fd43446e687ef9172111/")
        .set("auth", token)
        .expect(400);

      expect(response.body.error).toBe("A categoria que você está tentando excluir não existe.");
   });

   it("should throw error when try do delete a category without authorization", async () => {
      const response = await request(serverHttp)
        .delete("/category/6368fd43446e687ef9172111/")
        .expect(400);

      expect(response.body.error).toBe("Está rota precisa de autorização.");
   });

   it("should get categories", async () => {
      const response = await request(serverHttp)
        .get("/category")
        .expect(200);

      expect(response.body.categories).toBeTruthy();
   });
});

afterAll(async () => {
   await User.deleteMany();
   await Category.deleteMany();
   mongoose.disconnect();
});
