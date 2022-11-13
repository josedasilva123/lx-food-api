import { ObjectId } from "mongodb";
import Recipe, { iRecipe } from "../../models/Recipes";
import { iRecipeEditBody } from "../../routes/Recipe/@types";
import { Image } from "../File/Image.service";

export class RecipeEdit {
   async execute(body: iRecipeEditBody, file?: Express.Multer.File) {
      const { _id, userID, title, content, categories } = body;

      const objectID = new ObjectId(_id);

      const recipe = (await Recipe.findOne({ _id: objectID })) as iRecipe;

      if (!recipe) {
         throw new Error("Desculpe, receita não encontrada.");
      }

      if (userID !== String(recipe._id)) {
         throw new Error("Somente o propretário da receita pode edita-la.");
      }

      let newImage = { path: recipe.thumbnail_url };

      if (file) {
         const image = new Image();

         newImage = await image.optmize(file);

         await image.delete(file.path);
      }

      await Recipe.updateOne(
         {
            _id,
         },
         {
            $set: {
               title,
               content,
               thumbnail_url: newImage.path,
               categories: JSON.parse(categories),
            },
         }
      );

      return { message: "Receita atualizada com sucesso!" };
   }
}
