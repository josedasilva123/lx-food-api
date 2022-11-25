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
router.get("/:_id", HandleErrors(RecipeControllers.GetOneById));

export default router;
