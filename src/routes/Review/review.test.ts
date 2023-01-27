import mongoose from "mongoose";
import Recipe, { iRecipe } from "../../models/Recipes";
import User from "../../models/User";
import request from "supertest";
import { serverHttp } from "../../server";

const getMockUser = async (email: string, password: string) => {
   const response = await request(serverHttp).post("/user/login").send({
      email,
      password,
   });

   return response.body;
};

beforeAll(async () => {
   await mongoose.connect("mongodb://localhost:27017/lxcook-review-test");

   const userA = await request(serverHttp).post("/user").send({
      name: "Osvaldo",
      email: "osvaldo@email.com.br",
      password: "@12Patinhos",
   });

   await request(serverHttp).post("/user").send({
      name: "Joilson",
      email: "joilson@email.com.br",
      password: "@12Patinhos",
   });

   await Recipe.create({
      userId: "6368fd43446e687ef917f6fd",
      title: "Receita Exemplo",
      content: "Conteúdo da receita de exemplo...",
      thumbnail_filename: "/08ddb62954942371563c8b8a02e6359c",
      thumbnail_url: "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/08ddb62954942371563c8b8a02e6359c",
   });
});

describe("Review Routes", () => {
   it("should be able to create a review in a recipe", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const response = await request(serverHttp)
         .post("/review")
         .send({
            recipeId: String(getRecipe.body.recipes[0]._id),
            content: "Uma verdadeira delícia!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(200);

      expect(response.body.message).toBe("Revisão cadastrada com sucesso!");
   });

   it("should throw error when try to send a review twice with the same user", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const response = await request(serverHttp)
         .post("/review")
         .send({
            recipeId: String(getRecipe.body.recipes[0]._id),
            content: "Uma verdadeira delícia!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("O respectivo usuário já avaliou está receita.");
   });

   it("should throw error when try to review an invalid recipe", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const response = await request(serverHttp)
         .post("/review")
         .send({
            recipeId: "6368fd43446e687ef917f6fd",
            content: "Uma verdadeira delícia!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("A receita que você está tentando avaliar não existe.");
   });

   it("should be able to edit a review in a recipe", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .patch(`/review/${String(recipe._id)}/${recipe.reviews[0]._id}`)
         .send({
            content: "Uma verdadeira delícia! Com certeza!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(200);

      expect(response.body.message).toBe("Revisão atualizada com sucesso!");
   });

   it("should throw error when try to edit an invalid recipe", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .patch(`/review/6368fd43446e687ef917f6fd/${recipe.reviews[0]._id}`)
         .send({
            content: "Uma verdadeira delícia! Com certeza!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("A receita que você referenciou não existe.");
   });

   it("should throw error when try to edit an invalid review", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .patch(`/review/${String(recipe._id)}/6368fd43446e687ef917f6fd`)
         .send({
            content: "Uma verdadeira delícia! Com certeza!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("A revisão que você está tentando editar não existe.");
   });

   it("should throw error when try to edit a review with another user", async () => {
      const user = await getMockUser("joilson@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .patch(`/review/${String(recipe._id)}/${recipe.reviews[0]._id}`)
         .send({
            content: "Uma verdadeira delícia! Com certeza!",
            score: 5,
         })
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("Somente o autor da revisão pode edita-la.");
   });

   it("should throw error when try to delete a review form  an invalid recipe", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .delete(`/review/6368fd43446e687ef917f6fd/${recipe.reviews[0]._id}`)
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("A receita que você referenciou não existe.");
   });

   it("should throw error when try to delete a invalid review", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .delete(`/review/${String(recipe._id)}/6368fd43446e687ef917f6fd`)
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("A revisão que você está tentando excluir não existe.");
   });

   it("should throw error when try to delete a invalid review", async () => {
      const user = await getMockUser("joilson@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .delete(`/review/${String(recipe._id)}/${recipe.reviews[0]._id}`)
         .set("auth", user.token)
         .expect(400);

      expect(response.body.error).toBe("Somente o autor da revisão pode exclui-la.");
   });

   it("should be able to delete a review", async () => {
      const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

      const getRecipe = await request(serverHttp).get("/recipe");

      const recipe = getRecipe.body.recipes[0];

      const response = await request(serverHttp)
         .delete(`/review/${String(recipe._id)}/${recipe.reviews[0]._id}`)
         .set("auth", user.token)
         .expect(200);

      expect(response.body.message).toBe("Revisão removida com sucesso!");
   });
});

afterAll(async () => {
   await User.deleteMany();
   await Recipe.deleteMany();
   mongoose.disconnect();
});
