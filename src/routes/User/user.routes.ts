import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import UserControllers from "./user.controllers";
import { userLoginValidation, userRegisterValidation } from "./user.validations";

const router = Router();

router.post("/", userRegisterValidation(), Validate, HandleErrors(UserControllers.Register));
router.post("/login", userLoginValidation(), Validate, HandleErrors(UserControllers.Login));
router.get("/autologin", Authenticate, HandleErrors(UserControllers.AutoLogin));

export default router;
