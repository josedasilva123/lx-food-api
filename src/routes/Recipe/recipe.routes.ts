import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import { MulterSingleUpload } from "../../middlewares/multer";
import RecipeControllers from "./recipe.controllers";
import {recipeDeleteValidation } from "./recipe.validations";

const router = Router();

router.post("/", Authenticate, MulterSingleUpload, HandleErrors(RecipeControllers.Create));
router.patch("/", Authenticate, MulterSingleUpload, HandleErrors(RecipeControllers.Edit))
router.delete("/:recipeId", Authenticate, recipeDeleteValidation(), Validate)
router.get("/", HandleErrors(RecipeControllers.Get))
router.get("/:userId", HandleErrors(RecipeControllers.Get))
router.get("/recipe/", HandleErrors(RecipeControllers.GetOneById))
router.get("/category/:category", HandleErrors(RecipeControllers.GetByCategory))
router.get("/search/:search", HandleErrors(RecipeControllers.Search))


export default router;
