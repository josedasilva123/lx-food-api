import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
import { iRecipeGetByOne } from "../../routes/Recipe/types";

export class RecipeGetOneById{
    async execute(query: iRecipeGetByOne){
        const { _id } = query;
        
        const objectID = new ObjectId(_id);

        const recipes = await Recipe.findOne({ _id: objectID }); 

        return { recipes };
    }
}