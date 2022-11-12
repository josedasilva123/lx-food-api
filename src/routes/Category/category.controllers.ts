import { Request, Response } from "express";
import { CategoryCreate } from "../../services/Category/Create.service";
import { CategoryDelete } from "../../services/Category/Delete.service";
import { CategoryGet } from "../../services/Category/Get.service";
import { iCategoryCreateBody, iCategoryDeleteParams } from "./@types";

export default class CategoryControllers{
    async Create(req: Request<{}, {}, iCategoryCreateBody, {}>, res: Response){
        const categoryCreate = new CategoryCreate();
        const response = await categoryCreate.execute(req.body);

        res.status(200).json(response);
    }

    async Delete(req: Request<iCategoryDeleteParams, {}, {}, {}>, res: Response){
        const categoryDelete = new CategoryDelete();
        const response = await categoryDelete.execute(req.params);

        res.status(200).json(response);
    }

    async Get(req: Request, res: Response){
        const categoryGet = new CategoryGet();
        const response = await categoryGet.execute();

        res.status(200).json(response);
    }
}