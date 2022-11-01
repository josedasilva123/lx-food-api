import User from "../../models/User";
import bcrypt from "bcryptjs";

export class UserRegister {
  async execute(body: iRegisterBody) {
    const { name, email, password } = body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new Error(
        "Desculpe, o e-mail fornecido já pertence a um usuário cadastrado."
      );
    }

    const encryptedPassword = bcrypt.hashSync(password, 1);

    const user = {
      name,
      email,
      password: encryptedPassword,
    };

    await User.create(user);
    return { message: "Cadastro realizado com sucesso!" };
  }
}
