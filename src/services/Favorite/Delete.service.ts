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

      if (!user.favoriteRecipes?.some((recipe) => recipe.id === recipeId)) {
         throw new Error("Está receita não está na lista de favoritos ou é inválida.");
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

      return { message: "Favorito removido com sucesso!" };
   }
}
