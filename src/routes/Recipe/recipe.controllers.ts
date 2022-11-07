import { Request, Response } from "express";
import { RecipeCreate } from "../../services/Recipe/Create.service";
import { RecipeDelete } from "../../services/Recipe/Delete.service";
import { RecipeEdit } from "../../services/Recipe/Edit.service";
import { RecipeGet } from "../../services/Recipe/Get.service";
import { RecipeGetByCategory } from "../../services/Recipe/GetByCategory.service";
import { RecipeGetOneById } from "../../services/Recipe/GetOneById.service";
import { RecipeSearch } from "../../services/Recipe/Search.service";
import {
  iGlobalRecipeQuery,
  iRecipeCreateBody,
  iRecipeDeleteParams,
  iRecipeEditBody,
  iRecipeGetByCategoryParams,
  iRecipeGetByOne,
  iRecipeGetParams,
  iRecipeSearchParams,
} from "./types";

export default class RecipeControllers {
  static async Create(
    req: Request<{}, {}, iRecipeCreateBody, {}>,
    res: Response
  ) {
    if (!req.file) {
      throw new Error("Arquivo enviando inválido.");
    }

    const recipeCreate = new RecipeCreate();
    const response = await recipeCreate.execute(
      req.body,
      req.file as Express.Multer.File
    );

    res.status(200).json(response);
  }

  static async Delete(
    req: Request<iRecipeDeleteParams, {}, {}, {}>,
    res: Response
  ) {
    const recipeDelete = new RecipeDelete();
    const response = await recipeDelete.execute(req.params);

    res.status(200).json(response);
  }

  static async Edit(req: Request<{}, {}, iRecipeEditBody, {}>, res: Response) {
    const recipeEdit = new RecipeEdit();
    const response = recipeEdit.execute(req.body, req.file);

    res.status(200).json(response);
  }

  static async Get(
    req: Request<iRecipeGetParams, {}, {}, iGlobalRecipeQuery>,
    res: Response
  ) {
    const recipeGet = new RecipeGet();
    const response = recipeGet.execute(req.params, req.query);

    res.status(200).json(response);
  }

  static async GetByCategory(
    req: Request<iRecipeGetByCategoryParams, {}, {}, iGlobalRecipeQuery>,
    res: Response
  ) {
    const recipeGetByCategory = new RecipeGetByCategory();
    const response = recipeGetByCategory.execute(req.params, req.query);

    res.status(200).json(response);
  }

  static async GetOneById(
    req: Request<{}, {}, {}, iRecipeGetByOne>,
    res: Response
  ) {
    const recipeGetOneById = new RecipeGetOneById();
    const response = recipeGetOneById.execute(req.query);

    res.status(200).json(response);
  }

  static async Search(
    req: Request<iRecipeSearchParams, {}, {}, iGlobalRecipeQuery>,
    res: Response
  ) {
    const recipeSearch = new RecipeSearch();
    const response = recipeSearch.execute(
      req.params.search as string,
      req.query
    );

    res.status(200).json(response);
  }
}
