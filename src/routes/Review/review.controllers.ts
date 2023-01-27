import { Request, Response } from "express";
import { iAuthenticateBody } from "../../@types/types";
import { ReviewCreate } from "../../services/Review/Create.service";
import { ReviewDelete } from "../../services/Review/Delete.service";
import { ReviewEdit } from "../../services/Review/Edit.service";
import { iReviewCreateBody, iReviewDeleteParams, iReviewEditBody, iReviewEditParams } from "./@types";

export default class ReviewControllers {
   static async Create(req: Request<{}, {}, iReviewCreateBody, {}>, res: Response) {
      const create = new ReviewCreate();
      const response = await create.execute(req.body);

      res.status(200).json(response);
   }

   static async Delete(req: Request<iReviewDeleteParams, {}, iAuthenticateBody, {}>, res: Response) {
      const remove = new ReviewDelete();
      const response = await remove.execute(req.body, req.params);

      res.status(200).json(response);
   }

   static async Edit(req: Request<iReviewEditParams, {}, iReviewEditBody, {}>, res: Response) {
      const edit = new ReviewEdit();
      const response = await edit.execute(req.body, req.params);

      res.status(200).json(response);
   }
}
