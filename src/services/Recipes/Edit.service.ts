import { ObjectId } from "mongodb";
import Recipe, { iRecipe } from "../../models/Recipes";
import { Image } from "../File/Image";

interface iRecipeEditBody{
    _id: string;
    title: string;
    content: string;
    categories: string[];
}

export class RecipeEdit {
  async execute(body: iRecipeEditBody, file: Express.Multer.File) {
    const { _id, title, content, categories } = body;

    const objectID = new ObjectId(_id);

    const recipe = (await Recipe.findOne({ _id: objectID })) as iRecipe;

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
          categories,
        },
      }
    );
  }
}