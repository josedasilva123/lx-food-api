import { body, param } from "express-validator";

export const categoryCreateValidation = () => {
    return [
       body("slug").isString().withMessage("O slug é obrigatório."),
 
       body("name").isString().withMessage("O nome (name) é obrigatório"),
    ];
 };

 export const categoryDeleteValidation = () => {
    return [
        param("categoryId").isString().withMessage("O id de categoria (categoryId) é obrigatório.")
    ]
 }