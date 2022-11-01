import { Router } from "express";
import { userRegisterValidation } from "./user.validations";

const router = Router();

router.post('/', userRegisterValidation())

export default router;



