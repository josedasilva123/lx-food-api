import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import CategoryControllers from "./category.controllers";
import { categoryCreateValidation, categoryDeleteValidation } from "./category.validations";

const router = Router();

router.post("/", Authenticate, categoryCreateValidation(), Validate, HandleErrors(CategoryControllers.Create));
router.delete("/", Authenticate, categoryDeleteValidation(), Validate, HandleErrors(CategoryControllers.Delete))
router.get("/", Authenticate, HandleErrors(CategoryControllers.Get))

export default router;