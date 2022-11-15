import { ObjectId } from "mongodb";
import { Info } from "multer-sharp-s3/dist/types/main";
import Recipe, { iRecipe } from "../../models/Recipes";
import { iRecipeEditBody } from "../../routes/Recipe/@types";

export class RecipeEdit {
   async execute(body: iRecipeEditBody, file?: Info) {
      const { _id, userID, title, content, categories } = body;

      const objectID = new ObjectId(_id);

      const recipe = (await Recipe.findOne({ _id: objectID })) as iRecipe;

      if (!recipe) {
         throw new Error("Desculpe, receita não encontrada.");
      }

      if (userID !== String(recipe._id)) {
         throw new Error("Somente o propretário da receita pode edita-la.");
      }

      await Recipe.updateOne(
         {
            _id,
         },
         {
            $set: {
               title,
               content,
               thumbnail_url: file?.Location,
               categories: JSON.parse(categories),
            },
         }
      );

      return { message: "Receita atualizada com sucesso!" };
   }
}
