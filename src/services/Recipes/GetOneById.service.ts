import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iRecipeGetQueryParams } from "../../routes/Recipes/types";

export class RecipeGetOneById{
    async execute(query: iRecipeGetQueryParams){
        const { _id } = query;
        
        const objectID = new ObjectId(_id);

        const recipes = await Recipe.findOne({ _id: objectID }); 

        return { recipes };
    }
}