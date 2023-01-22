import { Schema, model, ObjectId } from "mongoose";

interface iUserRecipe {
   recipeId: string;
   title: string;
   categories: string[];
}

export interface iUser {
   name: string;
   password: string;
   email: string;
   favoriteRecipes?: iUserRecipe[];
}

const userSchema = new Schema<iUser>(
   {
      name: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      favoriteRecipes: { type: Array<iUserRecipe>, required: false },
   },
   {
      timestamps: true,
   }
);

const User = model<iUser>("User", userSchema, "users");

export default User;
