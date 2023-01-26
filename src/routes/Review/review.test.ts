import mongoose from "mongoose";
import Recipe from "../../models/Recipes"
import User from "../../models/User"
import request from "supertest"
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
        password: "@12Patinhos"
    });

    await request(serverHttp).post("/user").send({
        name: "Joilson",
        email: "joilson@email.com.br",
        password: "@12Patinhos"
    });    

    await Recipe.create({
        userId: '6368fd43446e687ef917f6fd',
        title: 'Receita Exemplo',
        content: 'Conteúdo da receita de exemplo...',
        thumbnail_filename: '/08ddb62954942371563c8b8a02e6359c'  ,
        thumbnail_url: 'https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/08ddb62954942371563c8b8a02e6359c'
     })
})

describe("Review Routes", () => {
    it("should be able to create a review in a recipe", async () => {
        const user = await getMockUser("osvaldo@email.com.br", "@12Patinhos");

        const getRecipe = await request(serverHttp)
        .get("/recipe")
        

        const response = await request(serverHttp)
        .post("/review")
        .send({
           recipeId: String(getRecipe.body.recipes[0]._id),
           content: "Uma verdadeira delícia!",
           score: 5,
        })
        .set("auth", user.token)
        .expect(200)

        expect(response.body.message).toBe("Revisão cadastrada com sucesso!")
    })
})

afterAll(async () => {
    await User.deleteMany();
    await Recipe.deleteMany();
    mongoose.disconnect();
 });