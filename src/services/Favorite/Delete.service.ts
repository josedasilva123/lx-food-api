import { ObjectId } from "mongodb";
import { iAuthenticateBody } from "../../@types/types";
import Recipe from "../../models/Recipes";
import User, { iUser } from "../../models/User";
import { iFavoriteDeleteParams } from "../../routes/Favorite/@types";

export class FavoriteDelete {
   async execute(params: iFavoriteDeleteParams, body: iAuthenticateBody) {
      
      const { id } = body;
        
      const { recipeId } = params;

      const newObjectUserID = new ObjectId(id);

      const user = (await User.findOne({ _id: newObjectUserID })) as iUser;

      if (!user) {
         throw new Error("Usuário inválido.");
      }

      if (!user.favoriteRecipes?.some((recipe) => recipe.id === recipeId)) {
         throw new Error("Está receita não está na lista de favoritos ou é inválida.");
      }

      const newObjectRecipeID = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: newObjectRecipeID });

      if (!recipe) {
         throw new Error("A receita que você está tentando adicionar não existe.");
      }

      const newFavoriteRecipeList = user.favoriteRecipes?.filter((recipe) => recipe.id !== recipeId);

      await User.updateOne(
         {
            _id: newObjectUserID,
         },
         {
            $set: {
               favoriteRecipes: newFavoriteRecipeList,
            },
         }
      );

      return { recipes: newFavoriteRecipeList, message: "Favorito adicionado com sucesso!" };
   }
}
