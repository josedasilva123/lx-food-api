import { Request, Response } from "express";
import { iAuthenticateBody } from "../../@types/types";
import { UserAutoLogin } from "../../services/User/AutoLogin.service";
import { UserLogin } from "../../services/User/Login.service";
import { UserRegister } from "../../services/User/Register.service";
import { iLoginBody, iRegisterBody } from "./types";

export default class UserControllers {
   static async Register(req: Request<{}, {}, iRegisterBody, {}>, res: Response) {
      const register = new UserRegister();
      const response = await register.execute(req.body);

      res.status(200).json(response);
   }

   static async Login(req: Request<{}, {}, iLoginBody, {}>, res: Response) {
      const login = new UserLogin();
      const response = await login.execute(req.body);

      res.status(200).json(response);
   }

   static async AutoLogin(req: Request<{}, {}, iAuthenticateBody, {}>, res: Response) {
      const autologin = new UserAutoLogin();
      const response = await autologin.execute(req.body);

      res.status(200).json(response);
   }
}
