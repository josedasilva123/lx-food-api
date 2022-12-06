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

describe("Favorite Routes", () => {
   it("should create a new favorite", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp)
         .post("/favorite/")
         .set("auth", token)
         .send({
            recipeId: "637e1f5d9e648375aeed83f2",
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
         })
         .expect(200);

      expect(response.body.message).toBe("Favorito adicionado com sucesso!");
   });

   it("should throw error when try to create a new favorite with the same id of another", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp)
         .post("/favorite/")
         .set("auth", token)
         .send({
            recipeId: "637e1f5d9e648375aeed83f2",
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
         })
         .expect(400);

      expect(response.body.error).toBe("Está receita já está na lista de favoritos.");
   });

   it("should throw error when try to create a favorite with a missing body parameter", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      await request(serverHttp)
         .post("/category/")
         .set("auth", token)
         .send({
            title: "Hamburguer Boladão",
            thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d",
         })
         .expect(422);
   });

   it("should throw error when try to delete unexisting favorite", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const response = await request(serverHttp).delete("/favorite/6368fd43446e687ef9172111/").set("auth", token).expect(400);

      expect(response.body.error).toBe("Está receita não está na lista de favoritos ou é inválida.");
   });


   it("should delete a existing favorite", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const deleteResponse = await request(serverHttp)
         .delete(`/favorite/637e1f5d9e648375aeed83f2/`)
         .set("auth", token)
         .expect(200);

      expect(deleteResponse.body.message).toBe("Favorito removido com sucesso!");
   });
});

afterAll(async () => {
   await User.deleteMany();
   mongoose.disconnect();
});
