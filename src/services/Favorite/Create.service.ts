import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import User, { iUser } from "../../models/User";
import { iFavoriteCreateBody } from "../../routes/Favorite/@types";

export class FavoriteCreate {
    async execute(body: iFavoriteCreateBody){
        const { id, recipeId, title, thumbnail_url } = body;

        const newObjectUserID = new ObjectId(id);

        const user = await User.findOne({ _id: newObjectUserID }) as iUser;

        if(user.favoriteRecipes?.some(recipe => recipe.id === recipeId)){
            throw new Error("Está receita já está na lista de favoritos.");
        }

        const newObjectRecipeID = new ObjectId(recipeId);
        
        const recipe = await Recipe.findOne({ _id: newObjectRecipeID });

        if(!recipe){
            throw new Error("A receita que você está tentando adicionar não existe.");    
        }        

        const newFavoriteRecipe = { id: recipeId, title, thumbnail_url }; 

        const newFavoriteRecipeList = [ ...(user.favoriteRecipes ? user.favoriteRecipes : []), newFavoriteRecipe];

        await User.updateOne({
            _id: newObjectUserID
        }, {
            $set: {
                favoriteRecipes: newFavoriteRecipeList
            }    
        })

        return { message: 'Favorito adicionado com sucesso!'}        
    }
}