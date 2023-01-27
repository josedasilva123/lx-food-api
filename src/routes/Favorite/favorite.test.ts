import mongoose from "mongoose";
import request from "supertest";
import Recipe from "../../models/Recipes";
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
   await mongoose.connect("mongodb://localhost:27017/lxcook-favorite-test");
   await request(serverHttp).post("/user").send(mockUser);
   await Recipe.create({
      userId: '6368fd43446e687ef917f6fd',
      title: 'Receita Exemplo',
      content: 'Conteúdo da receita de exemplo...',
      thumbnail_filename: '/08ddb62954942371563c8b8a02e6359c'  ,
      thumbnail_url: 'https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/08ddb62954942371563c8b8a02e6359c'
   })
});

describe("Favorite Routes", () => {
   it("should create a new favorite", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const getRecipe = await request(serverHttp)
      .get("/recipe")
      .set("auth", token)
      .expect(200);      

      const response = await request(serverHttp)
         .post("/favorite/")
         .set("auth", token)
         .send({
            recipeId: String(getRecipe.body.recipes[0]._id),
            title: getRecipe.body.recipes[0].title,
            thumbnail_url: getRecipe.body.recipes[0].thumbnail_url,
         })
         .expect(200);

      expect(response.body.message).toBe("Favorito adicionado com sucesso!");
   });

   it("should throw error when try to create a new favorite with the same id of another", async () => {
      const token = await getMockUserToken(mockUser.email, mockUser.password);

      const getRecipe = await request(serverHttp)
      .get("/recipe")
      .set("auth", token)
      .expect(200);

      const response = await request(serverHttp)
         .post("/favorite/")
         .set("auth", token)
         .send({
            recipeId: String(getRecipe.body.recipes[0]._id),
            title: getRecipe.body.recipes[0].title,
            thumbnail_url: getRecipe.body.recipes[0].thumbnail_url,
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

      const getRecipe = await request(serverHttp)
      .get("/recipe")
      .set("auth", token)
      .expect(200);

      const deleteResponse = await request(serverHttp)
         .delete(`/favorite/${getRecipe.body.recipes[0]._id}`)
         .set("auth", token)
         .expect(200);
         

      expect(deleteResponse.body.message).toBe("Favorito removido com sucesso!");
   });
});

afterAll(async () => {
   await User.deleteMany();
   await Recipe.deleteMany();
   mongoose.disconnect();
});
