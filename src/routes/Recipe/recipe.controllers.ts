import { Request, Response } from "express";
import { Info } from "multer-sharp-s3/dist/types/main";
import { RecipeCreate } from "../../services/Recipe/Create.service";
import { RecipeDelete } from "../../services/Recipe/Delete.service";
import { RecipeEdit } from "../../services/Recipe/Edit.service";
import { RecipeGet } from "../../services/Recipe/Get.service";
import { RecipeGetOneById } from "../../services/Recipe/GetOneById.service";
import {
   iGlobalRecipeQuery,
   iRecipeCreateBody,
   iRecipeDeleteParams,
   iRecipeEditBody,
   iRecipeEditParams,
   iRecipeGetByOneParams,
} from "./@types";

export default class RecipeControllers {
   static async Create(req: Request<{}, {}, iRecipeCreateBody, {}>, res: Response) {
      if (!req.file) {
         throw new Error("Arquivo enviado inválido.");
      }

      const recipeCreate = new RecipeCreate();
      const response = await recipeCreate.execute(req.body, req.file as Info);

      res.status(200).json(response);
   }

   static async Delete(req: Request<iRecipeDeleteParams, {}, {}, {}>, res: Response) {
      const recipeDelete = new RecipeDelete();
      const response = await recipeDelete.execute(req.params);

      res.status(200).json(response);
   }

   static async Edit(req: Request<iRecipeEditParams, {}, iRecipeEditBody, {}>, res: Response) {
      const recipeEdit = new RecipeEdit();
      const response = await recipeEdit.execute(req.body, req.params, req.file as Info);

      res.status(200).json(response);
   }

   static async Get(req: Request<{}, {}, {}, iGlobalRecipeQuery>, res: Response) {
      const recipeGet = new RecipeGet();
      const response = await recipeGet.execute(req.query);

      res.status(200).json(response);
   }

   static async GetOneById(req: Request<iRecipeGetByOneParams, {}, {}, {}>, res: Response) {
      const recipeGetOneById = new RecipeGetOneById();
      const response = await recipeGetOneById.execute(req.params);

      res.status(200).json(response);
   }
}
