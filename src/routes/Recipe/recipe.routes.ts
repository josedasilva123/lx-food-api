import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import { MulterSingleUpload } from "../../middlewares/multer";
import RecipeControllers from "./recipe.controllers";
import { recipeCreateValidation, recipeDeleteValidation, recipeEditValidation } from "./recipe.validations";

const router = Router();

router.post("/", Authenticate, MulterSingleUpload, recipeCreateValidation(), Validate, HandleErrors(RecipeControllers.Create));
router.patch("/", Authenticate, MulterSingleUpload, recipeEditValidation, Validate, HandleErrors(RecipeControllers.Edit));
router.delete("/:recipeId", Authenticate, recipeDeleteValidation(), Validate, HandleErrors(RecipeControllers.Delete));
router.get("/", HandleErrors(RecipeControllers.Get));
router.get("/:userId", HandleErrors(RecipeControllers.Get));
router.get("/recipe/", HandleErrors(RecipeControllers.GetOneById));
router.get("/category/:category", HandleErrors(RecipeControllers.GetByCategory));
router.get("/search/:search", HandleErrors(RecipeControllers.Search));

export default router;
