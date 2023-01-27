import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import ReviewControllers from "./review.controllers";
import { reviewCreateValidation, reviewDeleteValidation, reviewEditValidation } from "./review.validations";

const router = Router();

router.post("/", Authenticate, reviewCreateValidation(), Validate, HandleErrors(ReviewControllers.Create));
router.delete("/:recipeId/:reviewId", Authenticate, reviewDeleteValidation(), Validate, HandleErrors(ReviewControllers.Delete));
router.patch("/:recipeId/:reviewId", Authenticate, reviewEditValidation(), Validate, HandleErrors(ReviewControllers.Edit));

export default router;
