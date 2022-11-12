import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { iLoginBody } from "../../routes/User/@types";

export class UserLogin {
   async execute(body: iLoginBody) {
      const { email, password } = body;

      const user = await User.findOne({ email: email });

      if (!user) {
         throw new Error("Desculpe, o usuário fornecido não existe.");
      }

      if (!bcrypt.compareSync(password, user.password)) {
         throw new Error("Desculpe, a senha fornecida está incorreta.");
      }

      const token = jwt.sign(
         {
            id: user._id,
         },
         process.env.JWT_SECRETKEY as string,
         { expiresIn: "12h" }
      );

      return {
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            favoriteRecipes: user.favoriteRecipes,
         },
         token: token,
      };
   }
}
