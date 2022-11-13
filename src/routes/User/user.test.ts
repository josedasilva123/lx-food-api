import mongoose from "mongoose";
import request from "supertest";
import User from "../../models/User";
import { serverHttp } from "../../server";

beforeAll(async () => {
   await mongoose.connect("mongodb://localhost:27017/lxcook-user-test");
});

describe("User Routes", () => {
   it("should register user", async () => {
      const response = await request(serverHttp)
         .post("/user/")
         .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(200);

      expect(response.body.message).toBe("Cadastro realizado com sucesso!");
   });

   it("should throw error when try to register and existing user", async () => {
      const response = await request(serverHttp)
         .post("/user/")
         .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
   });

   it("should throw error when missing body parameter in register", async () => {
      const response = await request(serverHttp)
         .post("/user/")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(422);

      expect(response.body).toBeTruthy();
   });

   it("should return user when login is correct", async () => {
      const response = await request(serverHttp)
         .post("/user/login")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(200);

      expect(response.body.token).toBeTruthy();
      expect(response.body.user).toBeTruthy();
   });

   it("should throw error when try to login with a unexisting user", async () => {
      const response = await request(serverHttp)
         .post("/user/login")
         .send({
            email: "alecao@email.com.br",
            password: "@12Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("Desculpe, o usuário fornecido não existe.");
   });

   it("should throw error when try to login with wrong password", async () => {
      const response = await request(serverHttp)
         .post("/user/login")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos2",
         })
         .expect(400);

      expect(response.body.error).toBe("Desculpe, a senha fornecida está incorreta.");
   });

   it("should autologin user", async () => {
      const login = await request(serverHttp).post("/user/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .get("/user/autologin")
         .set("auth", login.body.token)
         .expect(200);

      expect(response.body.user).toBeTruthy();
   });

   it("should throw error when token is invalid on autologin", async () => {
      const response = await request(serverHttp)
         .get("/user/autologin")
         .set("auth", "123")
         .expect(400);

      expect(response.body.error).toBe("Sua token expirou ou é inválida.");   
   });
});

afterAll(async () => {
   await User.deleteMany();
   mongoose.disconnect();
});
