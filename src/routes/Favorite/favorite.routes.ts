import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import FavoriteControllers from "./favorite.controllers";
import { favoriteCreateValidation, favoriteDeleteValidation } from "./favorite.validations";

const router = Router();

router.post("/", Authenticate, favoriteCreateValidation(), Validate, HandleErrors(FavoriteControllers.Create));
router.delete("/:recipeId", Authenticate, favoriteDeleteValidation(), Validate, HandleErrors(FavoriteControllers.Delete));

export default router;
